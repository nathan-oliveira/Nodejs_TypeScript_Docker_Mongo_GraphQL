import NewsService from "../services/newsService";

const resolvers = {
  newslist: async () => await NewsService.get(),
  newsGetById: async (args) => await NewsService.getById(args.id),
  addNews: async (args) => await NewsService.create(args),
  deleteNews: async (args) => await NewsService.delete(args.id),
  updateNews: async (args) => await NewsService.update(args.input._id, args.input),
};

export default resolvers;
