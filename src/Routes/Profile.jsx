const Profile = ({ token }) => {
  if (token) {
    return (
      <>
        <p>Mon profil</p>
      </>
    );
  } else {
    return <>Not authorized</>;
  }
};
export default Profile;
