import Axios from 'axios';

export function getMetadata(postId: string) {
    return Axios.get(`http://52.66.83.191:5001/?postId=${postId}&minimal=true`)
    .then((response) => response.data);
}
