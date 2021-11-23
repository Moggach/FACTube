// import Account from '../components/Account';

// const Profile = () => {
//   return (
//     <>
//       <Account />
//     </>
//   );
// };

// export default Profile;

import { useState, useEffect } from 'react';
import { supabase } from '../lib/initSupabase';
import Auth from '../components/Auth';
import Account from '../components/Account';
import { getUsers } from '../lib/model';

console.log(getUsers());

export default function Profile() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    console.log(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth />
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </div>
  );
}
