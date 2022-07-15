import { Configs } from 'app-configs';

export function getImageWithId(id) {
    return Configs.BASE_API + '/media/' + String(id);
}

export function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}
