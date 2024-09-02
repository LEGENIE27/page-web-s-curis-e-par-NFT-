async function checkNFTOwnership() {
    if (typeof window.ethereum !== 'undefined') {
        // Demande à l'utilisateur de se connecter à MetaMask
        await ethereum.request({ method: 'eth_requestAccounts' });

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const userAddress = await signer.getAddress();

        const contractAddress = '0x0561a9626EcF7B98170534d264d51bF10A4942F0'; // Adresse du contrat MyNFT
        const contractABI = [
            "function balanceOf(address owner) view returns (uint256)"
        ];
        const contract = new ethers.Contract(contractAddress, contractABI, provider);

        try {
            // Vérifie si l'utilisateur possède au moins un NFT
            const balance = await contract.balanceOf(userAddress);
            if (balance.gt(0)) {
                document.getElementById('content').style.display = 'block';
            } else {
                document.getElementById('error').style.display = 'block';
            }
        } catch (error) {
            console.error("Erreur lors de la vérification du NFT:", error);
            document.getElementById('error').style.display = 'block';
        } finally {
            document.getElementById('loading').style.display = 'none';
        }
    } else {
        alert('MetaMask est requis pour accéder à cette page.');
        document.getElementById('loading').style.display = 'none';
        document.getElementById('error').style.display = 'block';
    }
}

// Appelle la fonction pour vérifier la possession du NFT
checkNFTOwnership();
