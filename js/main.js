// main.js

const serverUrl = "https://p0utx6ehq11l.usemoralis.com:2053/server";
const appId = "yPL6N19fPRapUKFb2saYnPCveRitF8ZeLwPeQ97s";
Moralis.start({ serverUrl, appId });

// Login Function 

async function login() {
    let user = Moralis.User.current();
    if (!user) {
     try {
        user = await Moralis.authenticate({ signingMessage: "Welcome to IPFS Upload project by Orion. Enjoy!" })
        console.log(user)
        console.log(user.get('ethAddress'))
     } catch(error) {
       console.log(error)
     }
    }
  }
  
  document.getElementById("btn-login").onclick = login;
  
  
  // Upload an Image
  
  uploadImage = async () => {
      const data = fileInput.files[0]
      const file = new Moralis.File(data.name, data)
      await file.saveIPFS();  
  
      console.log(file.ipfs(), file.hash())
  
      // provides the URL of the image
      return file.ipfs();
  }
  
  
  
  // Upload metadata object name and description
  
  uploadMetadata = async (imageURL) => {
      // build the metadata object
      const name = document.getElementsByName('metadataName');
      const description = document.getElementById('metadataDescription');
  
      const metadata = {
          "name": name,
          "description": description,
          "image": imageURL
  
      }
  
      // saves the file to ipfs
      const file = new Moralis.File("file.json", {base64 : btoa(JSON.stringify(metadata))});
      await file.saveIPFS();
  
      console.log(file.ipfs());

  }

  
  // Function for the upload button 
  
  uploading = async () => {
      const image = await uploadImage();
      await uploadMetadata(image)
  }