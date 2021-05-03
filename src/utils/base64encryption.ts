export function toBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {

      resolve({type: file.type, file: reader.result});
    };
    // }
    // reader.onerror = (error) => reject(error);
  });
}
