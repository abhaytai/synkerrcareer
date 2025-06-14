import React, { createContext, useEffect, useState, useContext } from 'react';
import { User } from 'firebase/auth';
import { auth } from './firebase';

export interface AuthContextInterface {
  user: User | undefined | null;
}

export const AuthContext = createContext<AuthContextInterface>({
  user: undefined,
});

export const AuthProvider = (props: { children?: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    return auth.onAuthStateChanged(setUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

// export default Feedback;

{
  /* <label className="text-gray-700 col-span-1 lg:col-span-2">
              <span className="text-white font-bold inline-block mt-6">
                Brief your experience
              </span>
              <textarea
                className="border-white-300 border rounded w-full py-1 px-2"
                value={experience}
                onChange={(e) => setexperience(e.target.value)}
                rows={1}
                required
              />
            </label> */
}
{
  /* <label className="text-gray-700 col-span-1 lg:col-span-2">
              <span className="text-white font-bold inline-block mt-6">
                Why you want to join Synkerr (min 100 words)
                <span className="text-red-500">*</span>
              </span>
              <textarea
                className="border-white-300 border rounded w-full py-1 px-2"
                value={reason}
                onChange={(e) => setreason(e.target.value)}
                rows={1}
                required
              />
            </label> */
}
{
  /* <label className="text-gray-700">
              <span className="text-white font-bold inline-block mt-6">
                Major Project Link
              </span>
              <input
                className="border-white-300 border rounded w-full py-1 px-2"
                value={projectLink}
                onChange={(e) => setprojectLink(e.target.value)}
                required
              />
            </label> */
}
