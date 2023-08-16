import { useRef, useState, ChangeEvent } from 'react';
import InputLabel from './InputLabel';
import { DangerButton, PrimaryButton } from './Buttons';
import InputError from './InputError';

type UpdateCoverImageProps = {
  error: string | undefined;
  imagePath: string;
  imageUrl: string;
  onChange: (value: File) => void;
  name: string;
}

const classes = 'relative mt-2 block h-56 w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-sky-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100';

export default function UpdateCoverImage({
  error, imagePath, imageUrl, onChange, name,
}: UpdateCoverImageProps) {
  const [imagePreview, setImagePreview] = useState<string>();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files) {
      setImagePreview(URL.createObjectURL(files[0]));
      onChange(files[0]);
    }
  };

  const localRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleImageChange(e)}
        ref={localRef}
      />

      <InputLabel htmlFor="image" value="Cover image" />

      {imagePreview !== undefined ? (
        <div className="mt-2">
          <span
            className={classes}
            style={{
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
              backgroundImage: `url('${imagePreview}')`,
            }} />
            <p className="mt-2 text-sm text-slate-400">
              Click &ldquo;Save changes&rdquo; to finalize.
            </p>
        </div>
      ) : (
        <div className="mt-2">
          <img
            src={imageUrl}
            alt={name}
            className={classes}
          />
        </div>
      )}

      <div className="mt-4 space-x-3">
        <PrimaryButton type="button" onClick={() => localRef.current?.click()}>
          Select a new cover image
        </PrimaryButton>
        {imagePath !== null && imagePreview === undefined ? (
          <DangerButton type="button">
            Remove cover image
          </DangerButton>
        ) : null}
        {imagePreview !== undefined ? (
          <DangerButton type="button" onClick={() => setImagePreview(undefined)}>
            Undo
          </DangerButton>
        ) : null}
      </div>

      <InputError message={error} className="mt-2" />
    </div>
  );
}
