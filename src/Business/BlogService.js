import Service from "Config/Api/Service";
import { getBlogById, blogSearch, addBlog, getOwnerBlog, deleteBlog, editBlog } from "Config/Api/ConfigURL";

class BlogBusiness extends Service {
    getBlogById = async (blogId, isGetRefs = false) => {
        let params = {
            isGetRefs: isGetRefs
        }
        let result = await this.get(`${getBlogById}/${blogId}`, params);
        return result;
    }

    getOwnerBlog = async () => {
        let result = await this.get(getOwnerBlog);
        return result;
    }

    addBlog = async (params) => {
        let result = await this.post(addBlog, params);
        return result;
    }

    blogSearch = async (params) => {
        let result = await this.get(blogSearch, params);
        return result
    }

    deleteBlog = async (blogId) => {
        let result = await this.post(`${deleteBlog}/${blogId}`);
        return result;
    }

    editBlog = async (params) => {
        let result = await this.post(editBlog, params);
        return result;
    }
}

const blogBusiness = new BlogBusiness();

export default blogBusiness;
