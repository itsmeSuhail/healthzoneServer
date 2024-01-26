class UniqueId {
    generateRandomString() {
        let ab= Date.now()+"";
        return ab.substring(0,12);
    }


}
export const uniqeId=new UniqueId();
