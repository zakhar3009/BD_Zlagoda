import OtherHousesSharpIcon from "@mui/icons-material/OtherHousesSharp.js";

export default function ProfileElement({icon: Icon, label, data}){
    return (
        <div className="p-3">
            <div className="flex justify-start">
                <Icon/>
                <label className="font-mono text-lg text-justify ml-2 font-colo">{label}</label>
            </div>
            <div className="flex justify-start ml-8">
                <label>{data}</label>
            </div>
        </div>
    )
}
