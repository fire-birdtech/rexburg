type AddressProps = {
  street: string;
  city: string;
  postalCode: string;
}

export default function Address({ street, city, postalCode }: AddressProps) {
  return (
    <p className="mt-6 text-xl font-medium text-slate-300">
      {`${street}, ${city}, Idaho ${postalCode}`}
    </p>
  );
}
