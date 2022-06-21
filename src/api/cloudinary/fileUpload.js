
const fileUpload = async (file) => {

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dubv6xkxf/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'Svelte-ZanleCoin');
    formData.append('file', file);

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        })

        if (resp.ok) {
            const cloudResp = await resp.json();
            const secure_url = cloudResp.secure_url 
            
            return secure_url;
        } else {
            throw await resp.json();
        }
    } catch (err) {
        throw err;
        console.log(err)
    }



}

export default fileUpload
