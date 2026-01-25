export interface ImageFileType {
    file: File;
    preview: string;
}

export interface ImageUploaderHandlers {
    add: (images: ImageFileType[]) => void;
    delete: (index: number) => void;
}
