// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/*
 * Smart contract allowing users to trade (list and buy) NTFs from any ERC1155 smart contract.
 */

contract Marketplace is Ownable, ReentrancyGuard{
    
    using Counters for Counters.Counter;
    Counters.Counter private _listingIds;
    Counters.Counter private _tokensSold;
    uint256 private _volume;
    address ADTT;
    event TokenListed(address contractAddress, address seller, uint256 tokenId, uint256 pricePerToken,uint256 listingId);
    event TokenUnListed(address contractAddress, address seller, uint256 tokenId,uint256 listingId);
    event TokenSold(address contractAddress, address seller, address buyer, uint256 tokenId, uint256 pricePerToken,uint256 listingId);

   constructor(address _adttTokenAdress){
       ADTT = _adttTokenAdress;
   }

    mapping(uint256 => Listing) private idToListing;

    struct Listing {
        address contractAddress;
        address seller;
        uint256 tokenId;
        uint256 price;
        bool completed;
    }

    struct Stats {
        uint256 volume;
        uint256 itemsSold;
    }

    function listToken(address contractAddress, uint256 tokenId, uint256 price) public nonReentrant {
        ERC721 token = ERC721(contractAddress);

        require(token.ownerOf( tokenId) == msg.sender, "Caller must own given token!");
        require(token.isApprovedForAll(msg.sender, address(this)), "Contract must be approved!");

        _listingIds.increment();
        uint256 listingId = _listingIds.current();
        idToListing[listingId] = Listing(contractAddress, msg.sender, tokenId, price, false);

        emit TokenListed(contractAddress, msg.sender, tokenId, price,listingId);
    }

    function unListToken(uint256 listingId) public  nonReentrant {
        
        require(msg.sender == idToListing[listingId].seller, "Not authorized to unlist this token!");
        require(idToListing[listingId].completed == false, "Listing not available anymore!");
        idToListing[listingId].completed = false;
        emit TokenUnListed(idToListing[listingId].contractAddress,idToListing[listingId].seller,idToListing[listingId].tokenId,listingId);

    }
    
    function purchaseToken(uint256 listingId) public  nonReentrant {
        ERC721 token = ERC721(idToListing[listingId].contractAddress);
        IERC20 _adtt = IERC20(ADTT);    
        require(msg.sender != idToListing[listingId].seller, "Can't buy your onw tokens!");
        require(_adtt.balanceOf(msg.sender) >= idToListing[listingId].price , "Insufficient funds!");
        require(token.ownerOf( idToListing[listingId].tokenId) == idToListing[listingId].seller, "Seller doesn't own this token!");
        require(idToListing[listingId].completed == false, "Listing not available anymore!");
        
        _tokensSold.increment();
        _volume += idToListing[listingId].price;
        idToListing[listingId].completed = true;
        
        emit TokenSold(
            idToListing[listingId].contractAddress,
            idToListing[listingId].seller,
            msg.sender,
            idToListing[listingId].tokenId,
            
            idToListing[listingId].price,
			listingId
        );

        token.safeTransferFrom(idToListing[listingId].seller, msg.sender, idToListing[listingId].tokenId,  "");
        _adtt.transferFrom(msg.sender,idToListing[listingId].seller,(idToListing[listingId].price /50)*49 ); //Transfering 98% to seller, fee 2%  ((msg.value/50)*49)
         _adtt.transferFrom(msg.sender,address(this),(idToListing[listingId].price /50) ); //Transfering fee 2% to smart contract  ((price/50))
    
    }

    function  viewAllListings() public view returns (Listing[] memory) {
        uint itemCount = _listingIds.current();
        uint unsoldItemCount = _listingIds.current() - _tokensSold.current();
        uint currentIndex = 0;

        Listing[] memory items = new Listing[](unsoldItemCount);

        for (uint i = 0; i < itemCount; i++) {
                uint currentId = i + 1;
                Listing storage currentItem = idToListing[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
        }

        return items;
    }

    function viewListingById(uint256 _id) public view returns(Listing memory) {
        return idToListing[_id];
    }

    function viewStats() public view returns(Stats memory) {
        return Stats(_volume, _tokensSold.current());
    }

    function withdrawFees() public onlyOwner nonReentrant {
       IERC20 _adtt = IERC20(ADTT);
        _adtt.transfer(msg.sender,_adtt.balanceOf(address(this)));
    }

}