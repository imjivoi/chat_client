import { IAttachments } from "@/store/interfaces/chat";

export function toBase64(file: File) {
  return new Promise((resolve, reject) => {
    let arr = {} as IAttachments;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // arr[i] = {};
      let title = file.name;
      let newfile = reader.result;
      let type = file.type.includes("image")
        ? "Image"
        : file.type.includes("audio")
        ? "Audio"
        : "File";
      let result = {
        file: newfile,
        title: title,
        type: type,
      };
      arr = Object.assign(arr, result);
      resolve(arr);
    };
    // }
    // reader.onerror = (error) => reject(error);
  });
}
