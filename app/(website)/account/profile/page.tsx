import { auth } from "@/lib/auth";
import { getUser } from "@/lib/dataApi";
import UpdateProfileForm from "../../_components/UpdateProfileForm";
import { getCountries } from "@/lib/roomsApi";

export default async function ProfilePage() {
  const [session, countries] = await Promise.all([auth(), getCountries()]);
  const data = session?.user?.email ? await getUser(session.user.email) : null;

  return (
    <div className="max-w-3xl rounded-sm border border-white/5 bg-slate-900/30 p-6 md:p-12">
      {data && (
        <div className="mb-10">
          <h3 className="text-xl font-bold text-white">Personal Information</h3>
          <p className="text-sm text-slate-500">
            Ensure your details match your government-issued ID.
          </p>
        </div>
      )}

      <UpdateProfileForm guestData={data} countries={countries} />
    </div>
  );
}
