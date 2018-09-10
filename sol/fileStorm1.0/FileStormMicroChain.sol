pragma solidity ^0.4.18;

// ----------------------------------------------------------------------------
// Moac FileStorm MicroChain Contract Standard Interface
// https://github.com/MOACChain/moac-core/wiki/FileStorm
// ----------------------------------------------------------------------------
contract FileStormInterface {
    function list() public returns (uint count);
    function read() public;
    function write() public;
    function remove() public;
}

// ----------------------------------------------------------------------------
// Precompiled contract executed by Moac MicroChain SCS Virtual Machine
// ----------------------------------------------------------------------------
contract Precompiled10 {
  function ipfsFile (string, uint) public;
}

// ----------------------------------------------------------------------------
// FileStorm MicroChain contract providing list/read/write/remove ipfs files
// ----------------------------------------------------------------------------
contract FileStormMicroChain {
    
    enum AccessType { read, write, remove, verify }
    
    string[] public fileHashes;

    Precompiled10 constant PREC10 = Precompiled10(0xA); 
    
    //constructor
    function FileStormMicroChain() public {
    }

    function list() public returns (uint count) {
        return fileHashes.length;
    }

    function write(string fileHash) public {
        for (uint i=fileHashes.length; i>0; i--){
            if (compareStringsbyBytes(fileHash, fileHashes[i-1])){
                return;
            }
        }
        fileHashes.push(fileHash);

        PREC10.ipfsFile(fileHash, uint(AccessType.write));
    }
    
    function read(string fileHash) public {
        PREC10.ipfsFile(fileHash, uint(AccessType.read));
    }
    
    function remove(string fileHash) public {
        for (uint i=fileHashes.length; i>0; i--){
            if (compareStringsbyBytes(fileHash, fileHashes[i-1])){
                for (uint j=i-1; j<fileHashes.length-1; j++) {
                    fileHashes[j]=fileHashes[j+1];
                }
                delete fileHashes[fileHashes.length-1];
                fileHashes.length--;
            }
        }

        PREC10.ipfsFile(fileHash, uint(AccessType.remove));
    }
    
    function compareStringsbyBytes(string s1, string s2) public pure returns(bool)
    {
        bytes memory s1bytes = bytes(s1);
        bytes memory s2bytes = bytes(s2);
        if(s1bytes.length!=s2bytes.length) {
            return false;
        }
        else{
            for(uint i = 0;i<s1bytes.length;i++)
            {
                if(s1bytes[i] != s2bytes[i])
                 return false;
            }
            return true;
        }
    }
}