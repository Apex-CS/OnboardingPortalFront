

const UserStatus = () => {
    const currentStatus = 'Available'
    const lastUpdate = new Date();
    const userInfo = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus rem provident ipsam ipsum ullam sit amet? Facilis ad debitis atque repellat rerum inventore hic incidunt deserunt? Blanditiis, nesciunt? Expedita, quas.'
    return (
        <div className="flex h-60 flex-row bg-white border rounded-t-lg border-zinc-300">
            <div className="flex items-center justify-center w-1/4 bg-lime-400">
                <h1 className="text-5xl text-white">7/12</h1>
            </div>
            <div className="w-3/4 flex flex-col items-start justify-center mx-5">
                <h1 className="text-2xl my-2">Your Current Status - {currentStatus}</h1>
                <p className="my-2 text-justify">{userInfo}</p>
                <h5 className="text-sm text-gray-400 my-2">Last Update {lastUpdate.getTimezoneOffset()}</h5> 
            </div>
        </div>
    );
};

export default UserStatus;