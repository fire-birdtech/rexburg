import { useRef, useState, type ChangeEvent, type ReactElement } from 'react'
import InputLabel from './InputLabel'
import { DangerButton, PrimaryButton } from './Buttons'
import InputError from './InputError'

interface UpdateProfileImageProps {
  error: string | undefined
  imagePath: string
  imageUrl: string
  onChange: (value: File) => void
  name: string
}

export default function UpdateProfileImage ({
  error, imagePath, imageUrl, onChange, name
}: UpdateProfileImageProps): ReactElement {
  const [imagePreview, setImagePreview] = useState<string>()

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { files } = e.target

    if (files !== null) {
      setImagePreview(URL.createObjectURL(files[0]))
      onChange(files[0])
    }
  }

  const localRef = useRef<HTMLInputElement>(null)

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => { handleImageChange(e) }}
        ref={localRef}
      />

      <InputLabel htmlFor="image" value="Profile image" />

      {imagePreview !== undefined ? (
        <div className="mt-2">
          <span
            className="block h-28 w-28 rounded-full object-cover"
            style={{
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
              backgroundImage: `url('${imagePreview}')`
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
            className="h-28 w-28 rounded-full object-cover"
          />
        </div>
      )}

      <div className="mt-4 space-x-3">
        <PrimaryButton type="button" onClick={() => localRef.current?.click()}>
          Select a new profile image
        </PrimaryButton>
        {imagePath !== null && imagePreview === undefined ? (
          <DangerButton type="button">
            Remove profile image
          </DangerButton>
        ) : null}
        {imagePreview !== undefined ? (
          <DangerButton type="button" onClick={() => { setImagePreview(undefined) }}>
            Undo
          </DangerButton>
        ) : null}
      </div>

      <InputError message={error} className="mt-2" />
    </div>
  )
}
