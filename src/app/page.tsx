import { redirect } from 'next/navigation';

// TODO(AUTH-001): Check auth state and redirect accordingly
// For now, redirect to login
export default function Home() {
  // In production: check if user is logged in
  // const session = await getSession();
  // if (session) {
  //   redirect(session.userType === 'employer' ? '/employer' : '/job-seeker');
  // }

  redirect('/login');
}
