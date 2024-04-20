import Card from "@/components/cards/Card.jsx";
import useAuth from "@/hooks/auth/useAuth.js";
import OtherHousesSharpIcon from '@mui/icons-material/OtherHousesSharp';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import ProfileElement from "@/components/ui/profileElement.jsx";
import LocalPhoneSharpIcon from '@mui/icons-material/LocalPhoneSharp';
import PaidSharpIcon from '@mui/icons-material/PaidSharp';
import InsertInvitationSharpIcon from '@mui/icons-material/InsertInvitationSharp';
import SupervisedUserCircleSharpIcon from '@mui/icons-material/SupervisedUserCircleSharp';

export default function Profile() {
    const {auth} = useAuth();
    console.log(auth)
    return (
        <Card height="screen" maxW="max-w-3xl">
            <div className="flex justify-center">
                <label className="font-mono text-lg font-bold text-justify">Your profile</label>
            </div>
            <div className="p-3">
                <div className="flex justify-start">
                    <PersonSharpIcon/>
                    <label className="font-mono text-lg text-justify ml-2">Username</label>
                </div>
                <div className="flex justify-start ml-8">
                    <div>
                        <label className="font-mono  text-justify mr-2">Name: </label>
                        <label className="font-mono  text-justify mr-7">{auth.user.name}</label>
                    </div>
                    <div>
                        <label className="font-mono  text-justify mr-2">Surname: </label>
                        <label className="font-mono  text-justify mr-7">{auth.user.surname}</label>
                    </div>
                    <div>
                        <label className="font-mono  text-justify mr-2">Patronymic: </label>
                        <label className="font-mono  text-justify mr-7">{auth.user.patronymic}</label>
                    </div>
                </div>
            </div>
            <div className="p-3">
                <div className="flex justify-start">
                    <OtherHousesSharpIcon/>
                    <label className="font-mono text-lg text-justify ml-2">Home Address</label>
                </div>
                <div className="flex justify-start ml-8">
                    <div>
                        <label className="font-mono  text-justify mr-2">City: </label>
                        <label className="font-mono  text-justify mr-7">{auth.user.city}</label>
                    </div>
                    <div>
                        <label className="font-mono  text-justify mr-2">Street: </label>
                        <label className="font-mono  text-justify mr-7">{auth.user.street}</label>
                    </div>
                    <div>
                        <label className="font-mono  text-justify mr-2">Zip Code: </label>
                        <label className="font-mono  text-justify mr-7">{auth.user.zipCode}</label>
                    </div>
                </div>
            </div>
            <ProfileElement icon={LocalPhoneSharpIcon} label={"Phone number"} data={auth.user.phoneNumber}/>
            <ProfileElement icon={SupervisedUserCircleSharpIcon} label={"Role"} data={auth.user.role}/>
            <ProfileElement icon={PaidSharpIcon} label={"Salary"} data={auth.user.salary}/>
            <ProfileElement icon={InsertInvitationSharpIcon} label={"Date of birth"} data={auth.user.dateOfBirth}/>
            <ProfileElement icon={InsertInvitationSharpIcon} label={"Date of start working"}
                            data={auth.user.dateOfStart}/>
        </Card>
    )
}
