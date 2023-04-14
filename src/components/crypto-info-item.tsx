
type Props = {
    name: string;
    value: string;
}

export const CryptoInfoItem = (props: Props) => {

    return (
        <div className="mr-5">
            <p className="text-gray-600">{props.name}</p>
            <p className="text-xl">{props.value}</p>
        </div>
    )
}