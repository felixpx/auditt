
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable.sol";
import "@tableland/evm/contracts/ITablelandTables.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract AuDiTTERC721 is  ERC721Upgradeable,IERC721ReceiverUpgradeable {
   address owner;
   string public _table;
   uint256 private _tableId;
   string private _tablePrefix ;
   ITablelandTables private _tableland;
   using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
     // The testnet gateway URI plus query parameter
 string private _baseURIString ;   
 
 function initialize(string memory name_, string memory symbol_,address registry) public initializer  {
       __ERC721_init( name_, symbol_);     
       _tableland = ITablelandTables(registry);
        _tablePrefix = "AuDiTT";
        _baseURIString = "https://testnet.tableland.network/query?mode=list&s=";
      createTable();
       owner = msg.sender;
    }

      
    
    /**
   * @dev Function createTable - create table on Tableland to hold metadata
   * 
   **/
   function createTable() internal{
           _tableId = _tableland.createTable(
        address(this),
        string.concat(
          "CREATE TABLE AuDiTT_",Strings.toString(block.chainid),
          " (id int, name text, description text, image text, verified text,dateCreated int);"
        )
      );

      _table = string.concat(
        "AuDiTT_",Strings.toString(block.chainid),
        "_",
        Strings.toString(_tableId)
      );
   }

   /**
   * @dev Function mint - mint token for collection
   * @param to address to mint to
   * @param cid image link for image.
   * @param description description for NFT. 
   **/
   function mint(address to,string calldata cid,string calldata _name,string calldata description)  external returns(uint256 tokenId){
    require(msg.sender == owner,"Unauthorized minter.");
    _tokenIdCounter.increment();
     tokenId = _tokenIdCounter.current();
     
    _tableland.runSQL(
      address(this),
      _tableId,
      string.concat(
        "INSERT INTO ",
        _table,
        " (id, name,image,description,dateCreated) VALUES (",
        Strings.toString(tokenId),",",
        "'", _name,"',","'", cid,"','",description,"',",Strings.toString(block.timestamp),")"
      )
    );
    _mint(to, tokenId);
    return tokenId;
   }

   
 function tokenURI(uint256 tokenId) override
        public
       view
        returns (string memory)
    {
        return string.concat(_baseURIString,"select+json_object%28%27name%27%2Cname%2C%27image%27%2Cimage%2C%27description%27%2Cdescription%29+from+",_table,"+where+id%3D%0D%0A",Strings.toString(tokenId));

    } 

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4){
        return this.onERC721Received.selector;

    }

}