interface RefreshTokenEntry {
    deviceId: string;
    refreshToken: string;
    createdAt: Date;
}

export const addDevice = ( refreshTokenArr: RefreshTokenEntry[], deviceId: string, refreshToken: string, createdAt: Date )=> {

    let refreshTokenArray = refreshTokenArr;
    let newRefreshTokenObj = { deviceId, refreshToken, createdAt };
    console.log("Adding device with ID:", deviceId, refreshTokenArr, refreshTokenArray);

    if (!refreshTokenArray) {
        refreshTokenArray = [newRefreshTokenObj];
        return refreshTokenArray;
    }

    if (refreshTokenArray.length >= 5) {
        refreshTokenArray.sort(
                (a, b) =>  new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
        refreshTokenArray.shift(); // Remove the oldest token
    }

    refreshTokenArray =  refreshTokenArray.filter(arr => arr.deviceId !== deviceId );

    refreshTokenArray.push(newRefreshTokenObj);
    console.log("Updated refresh token array:", refreshTokenArray);

    return refreshTokenArray;
}