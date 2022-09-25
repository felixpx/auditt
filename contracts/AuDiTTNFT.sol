// contracts/GameItems.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AuDiTTNFT is ERC1155 ,Ownable {
     string public name = "AuDiTT NFT";
     string public symbol ="AUDITT"; 
     string _uri;
	 address minter;
	
     
	 constructor(string memory metadataURI,address _minter)  ERC1155("") {
        minter = _minter;  
         _uri = metadataURI;
         
    }
	
	
 	 
 /**
   * @dev Function allows for the minting of NFTs  
   * @param To mint to address
   * @param id tokenId to mint
   **/
	
	 
	 function mint(address To,uint256 id) public{
	   require(msg.sender == minter,"Unauthorized minter.");
	   
       _mint( To, id, 1, "");
   
	  
     }

/**
   * @dev Function allows for the burning of NFTs  
   * @param From address to burn from
   * @param id tokenId to mint
   **/
	
	 
	 function burn(address From,uint256 id) public{
	   require(msg.sender == minter,"Unauthorized minter.");
	   
       _burn( From, id, 1);
   
	  
     }
	 

	 
	 /**
     * @dev Function returns tokenId URI
    * @param tokenId of NFT.
   **/
	
	 function uri(uint256 tokenId) public override view returns (string memory){
      return string.concat(_uri,Strings.toString(tokenId));
    }

   /**
   * @dev Function sets address that is allowed to mint
    * @param _minter only address allowed to mint NFTs.
   **/
	

    function setMinter(address _minter) external onlyOwner{
    minter = _minter;
  }
}