// contracts/GameItems.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "AuDiTTERC721.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
// PUSH Comm Contract Interface
interface IPUSHCommInterface {
    function sendNotification(address _channel, address _recipient, bytes calldata _identity) external;
}

contract AuDiTTManager is Ownable {
    //Token Denominations
    uint256 public constant ADTT_50 = 1;
    uint256 public constant  ADTT_100 = 2;
    uint256 public constant  ADTT_500 = 3;
    uint256 public constant ADTT_1000 = 4;
    uint256 public constant ADTT_10000=5;
    
    address minter;
	address AuDiTTNFT;
    address ADTT;
    mapping (string =>bool) claims;
    mapping (address =>bool) approvedArtist;
    address AuDiTTImplementation;
    address tableLandRegistry=0x4b48841d4b32C4650E4ABc117A03FE8B51f38F68;
    struct collection {

        address  contractAddress;
        address owner;
        bool isValue;
        
    }

    mapping (address =>collection) collections;
    mapping (address => bool) admins;
    constructor(address _minter,address nftAddress,address _adtt) {
     minter = _minter;    
	 AuDiTTNFT = nftAddress;
     ADTT = _adtt;
     AuDiTTImplementation = address(new AuDiTTERC721());
    }


    event NFTMinted(address to,uint256 tokenId,uint256 dateMinted);
    event StakedNFT(address staker,uint256 tokenId,uint256 dateStaked,uint256 ADTT);
    event UnStakedNFT(address staker,uint256 tokenId,uint256 dateUnStaked,uint256 ADTT);
    event ApproveArtist(address artist,uint256 dateApproved);
    event RevokeApproval(address artist,uint256 dateRevoked);
    event CollectionCreated(address owner, address contractAddress,string name, string symbol,uint256 dateCreated);
    event CollectionNFTMinted(address contractAddress,address to,uint256 tokenId,string  _name,string  cid,string  description,uint256 dateMinted);


 /**
     * @dev Function allows minter to send notification to a user
     *  
    * @param recipient address of the admin  
    * @param title of notification
    * @param body of notification
   **/
function sendNotification(address recipient,string calldata title, string calldata body) public {
    require(isAdmin(msg.sender),"Unathorized sender.");
    IPUSHCommInterface(0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa).sendNotification(
    0xad261Af4cD895D6f7940D1B86cC849e01d3Af335, // from channel - recommended to set channel via dApp and put it's value -> then once contract is deployed, go back and add the contract address as delegate for your channel
    recipient, // to recipient, put address(this) in case you want Broadcast or Subset. For Targetted put the address to which you want to send
    bytes(
        string(
            // We are passing identity here: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/identity/payload-identity-implementations
            abi.encodePacked(
                "0", // this is notification identity: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/identity/payload-identity-implementations
                "+", // segregator
                "3", // this is payload type: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/payload (1, 3 or 4) = (Broadcast, targetted or subset)
                "+", // segregator
                title, // this is notificaiton title
                "+", // segregator
                body // notification body
            )
        )
    )
);
}

 /**
     * @dev Function allows minter to add other admins
     * used with litprotocol to give access to encrypted KYC data on IPFS 
    * @param admin address of the admin  
    
   **/
   function addAdmin(address admin) public {
      require(msg.sender ==minter || admins[msg.sender] == true,"Unauthorized approver."); 
      admins[admin]  =true; 

   }


/**
     * @dev Function allows to revoke admin rights
     * used with litprotocol to give access to encrypted KYC data on IPFS 
    * @param admin address of the admin  
    
   **/
   function removeAdmin(address admin) public {
      require(msg.sender ==minter || admins[msg.sender] == true,"Unauthorized approver.");
      require(admin !=minter ,"Unable to revoke rights of minter."); 
      require(msg.sender != admin,"You cannot revoke your own rights."); 
 
      admins[admin]  =false; 

   }

/**
     * @dev Function isAdmin - checks admin rights
     * used with litprotocol to give access to encrypted KYC data on IPFS 
    * @param _address address to check  
    
   **/
   function isAdmin(address _address) public  view returns(bool) {
     
      return(admins[_address] || _address==minter); 

   }


   /**
     * @dev Function allows admin to approve artist
    * @param artist address of the artist
    
   **/

function approveArtist(address artist) public {
   require(msg.sender ==minter,"Unauthorized approver."); 
   require(approvedArtist[artist] == false,"Artist already approved.");
   approvedArtist[artist] = true;
   emit ApproveArtist(artist,block.timestamp);
   
}



   /**
     * @dev Function allows admin to approve artist
    * @param artist address of the artist
    
   **/

function revokeApproval(address artist) public {
    require(msg.sender ==minter,"Unauthorized approver."); 
    require(approvedArtist[artist] == true,"Artist approval already revoked.");
   
    approvedArtist[artist] = false;
    emit RevokeApproval(artist,block.timestamp);

}

 /**
     * @dev Function create collection
    * @param _name of collection
    * @param _symbol of collection
   **/

function createCollection(string calldata _name, string calldata _symbol) public {
   require(approvedArtist[msg.sender],"Not an approved artist.");
    address clone = Clones.clone(AuDiTTImplementation);

    AuDiTTERC721(clone).initialize(_name,_symbol,tableLandRegistry);
    collections[clone].contractAddress = clone;
    collections[clone].owner = msg.sender;
    collections[clone].isValue =true;
    emit CollectionCreated(msg.sender, clone,_name, _symbol,block.timestamp);

}


/**
     * @dev Function allows artist to mint NFTs for colection
    * @param contractAddress address of collection
    * @param _name of collection
    * @param cid url of image 
    * @param description of NFT
   **/
   function mint(address contractAddress,string calldata _name,string calldata cid,string calldata description) public{
     require(approvedArtist[msg.sender],"Not an approved artist.");
    
    require(collections[contractAddress].isValue == true,"Invalid collection.");
    require(collections[contractAddress].owner==msg.sender,"Unauthorized minter.");
    uint256 tokenId = AuDiTTERC721(contractAddress).mint(msg.sender,cid,_name,description);
    emit CollectionNFTMinted(contractAddress,msg.sender, tokenId, _name,  cid, description,block.timestamp);

   }

   /**
     * @dev Function allows admin to  mint NFT
    * @param id tokenId
    
   **/

  function claimToken(uint256 id) public{
            (bool _success, ) =  AuDiTTNFT.call(abi.encodeWithSignature("mint(address,uint256)",msg.sender,id));
       require(_success,"Mint not successful.");
       emit NFTMinted(msg.sender,id,block.timestamp);

       
  }

   /**
     * @dev Function allows admin to  mint NFT
    * @param to address to mint to 
    * @param id tokenId of NFT.
   **/
  function mint(address to ,uint256  id)  public {
      require(msg.sender == minter,"Unauthorized minter.");
       require(id == ADTT_50 || id == ADTT_100 || id == ADTT_500|| id == ADTT_1000 || id == ADTT_10000,"Invalid tokenId.");      
      (bool success, ) =  AuDiTTNFT.call(abi.encodeWithSignature("mint(address,uint256)",to,id));
      require(success,"Mint not successful.");
      emit NFTMinted(to,id,block.timestamp);

  }


  /**
    * @dev Function allows user to stake NFT for ADTT tokens
    * @param id tokenId of NFT.
   **/    
  function stake(uint256 id) public{
    
     IERC1155 nft = IERC1155(AuDiTTNFT);
     require(id == ADTT_50 || id == ADTT_100 || id == ADTT_500|| id == ADTT_1000 || id == ADTT_10000,"Invalid tokenId.");      
     require(nft.balanceOf(msg.sender, id) >= 1,"You do not own this NFT");
     nft.safeTransferFrom(msg.sender, address(this), id, 1, "");
     uint256 amount;
     if(id==ADTT_50)
        amount = 50*10**18;
     if(id==ADTT_100)
        amount = 100*10**18;
     if(id==ADTT_500)
        amount = 500*10**18;  
     if(id==ADTT_1000)
        amount = 1000*10**18;

    if(id==ADTT_10000)
        amount = 10000*10**18;
    (bool success, ) =  ADTT.call(abi.encodeWithSignature("mintAuDiTT(address,uint256)",msg.sender,amount));
    require(success,"Failed to Mint ADTT Tokens."); 
    emit StakedNFT(msg.sender,id,block.timestamp,amount);
  }

  /**
    * @dev Function allows user to unstake NFT for ADTT tokens
    * @param id tokenId of NFT.
   **/ 
  function unstake(uint256 id) public{
    IERC1155 nft = IERC1155(AuDiTTNFT);
    IERC20 token = IERC20(ADTT); 
     require(id == ADTT_50 || id == ADTT_100 || id == ADTT_500|| id == ADTT_1000 || id == ADTT_10000,"Invalid tokenId.");      
     require(nft.balanceOf(address(this), id) >= 1,"No NFTs avaialbe to unstake.");
     uint256 amount;
     if(id==ADTT_50)
        amount = 50*10**18;
     if(id==ADTT_100)
        amount = 100*10**18;
     if(id==ADTT_500)
        amount = 500*10**18;  
     if(id==ADTT_1000)
        amount = 1000*10**18;

    if(id==ADTT_10000)
        amount = 10000*10**18;
       
     
        
    require(token.balanceOf(msg.sender)>=amount);
    token.transferFrom(msg.sender, address(this), amount);
    (bool _success, ) =  ADTT.call(abi.encodeWithSignature("burnAuDiTT(address,uint256)",address(this),amount));
    require(_success,"Failed to Burn ADTT Tokens."); 
    
     (bool _burnt, ) =  AuDiTTNFT.call(abi.encodeWithSignature("burn(address,uint256)",address(this),id));
     require(_burnt,"Burn not successful.");
    emit UnStakedNFT(msg.sender,id,block.timestamp,amount);
 

  }

  function onERC1155Received(address, address, uint256, uint256, bytes memory) public virtual returns (bytes4) {
        return this.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(address, address, uint256[] memory, uint256[] memory, bytes memory) public virtual returns (bytes4) {
        return this.onERC1155BatchReceived.selector;
    }

function setMinter(address _minter) external onlyOwner{
    minter = _minter;
  }
}
