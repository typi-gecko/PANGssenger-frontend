import SignupForm from '@/components/SignupForm';

export default function SignupPage() {
    return (
        <div className='flex flex-col justify-center items-center h-full'>
            <h1>회원가입</h1>
            <SignupForm />
        </div>
    );
}
