import SigninForm from '@/components/signinForm';

export default function SigninPage() {
  return (
    <div className='flex flex-col justify-center items-center h-full'>
      <h1>로그인</h1>
      <SigninForm />
    </div>
  );
}
