export const AuDiTTManagerAddress = "0x2454d3Eaf8ddCE99e50339D55fCbeF2472E191E5";
export const AuDiTTManagerABI = ["function sendNotification(address recipient,string calldata title, string calldata body) public"," function isAdmin(address _address) public  view returns(bool)"
,"function createCollection(string calldata _name, string calldata _symbol) public",
"function mint(address contractAddress,string calldata _name,string calldata cid,string calldata description) public",
"function claimToken(uint256 id) public","function mint(address to ,uint256  id)  public"
,"function stake(uint256 id) public","  function unstake(uint256 id) public"];
