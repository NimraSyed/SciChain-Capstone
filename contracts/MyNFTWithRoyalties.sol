// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

contract MyNFTWithRoyalties is ERC721URIStorage, ERC2981, Ownable {
    uint256 private _tokenIds;

    constructor() ERC721("MyNFTWithRoyalties", "MNFT") {}

    function mintNFT(address recipient, string memory tokenURI, uint96 royaltyFee) public onlyOwner returns (uint256) {
        _tokenIds++;
        uint256 newItemId = _tokenIds;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        // Set the royalty information for this NFT
        _setTokenRoyalty(newItemId, recipient, royaltyFee);

        return newItemId;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, ERC2981)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
