export const up = (currentDirectory) => {
    let currentDirectoryNew=currentDirectory.split('\\');
    if(currentDirectoryNew.length > 1){
        currentDirectoryNew.pop();
        currentDirectory = currentDirectoryNew.join('\\')
    }
    return currentDirectory; 
};