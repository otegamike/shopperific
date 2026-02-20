export interface ImageFileType {
    file: File | null;
    preview: string;
}

export interface ImageUploaderHandlers {
    add: (images: ImageFileType[]) => void;
    delete: (index: number) => void;
    reset: () => void;

}
