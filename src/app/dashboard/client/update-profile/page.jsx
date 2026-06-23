import ProfileCard from './ProfileCard';

const ProfilePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-6">
      <div className="w-full max-w-md">
        <ProfileCard />
      </div>
    </div>
  );
};

export default ProfilePage;