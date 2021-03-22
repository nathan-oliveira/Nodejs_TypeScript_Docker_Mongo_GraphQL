import NewsRepository from "../repository/newsRepository";

class NewsService {
  /* Paginação + search */
  async search(term, page, perPage) {
    // buscar por regex
    /*
    let result = await NewsRepository.find({
      title: new RegExp(".*" + term + "*.", "i"),
      active: true,
    });
    */
    let result = await NewsRepository.find({
      title: new RegExp(".*" + term + "*.", "i"),
      active: true,
    })
      .skip((page - 1) * perPage)
      .limit(perPage);

    return result;
  }

  async get() {
    let result = await NewsRepository.find({});

    // Ordenar por data
    //let result = await NewsRepository.find({}).sort({ publishData: -1 })

    // Ordenar por data e buscar apenas 2 registros
    //let result = await NewsRepository.find({}).sort({ publishData: -1 }).limit(2);

    // buscar somente as notificas que estão ativos e tags igual a not
    // let result = await NewsRepository.find({ 'active': true });
    // let result = await NewsRepository.find({ 'active': true, 'tag': 'not'  });

    // buscar com apenas três campos
    // let result = await NewsRepository.find({ active: true }, "tile hat img");

    // filtrar por datas
    //let startDate = new Date("2021-01-17T00:00:00.00Z");
    //let endDate = new Date("2021-01-17T00:00:00.00Z");
    //let result = await NewsRepository.find({ 'publishData': { $gt : startDate, $lt: endDate } });

    return result;
  }

  async getById(_id) {
    let result = await NewsRepository.findById(_id);
    return result;
  }

  async create(news) {
    let result = await NewsRepository.create(news);
    return result;
  }

  async update(_id, news) {
    let result = await NewsRepository.findByIdAndUpdate(_id, news);
    return result;
  }

  async delete(_id) {
    let result = await NewsRepository.findByIdAndRemove(_id);
    return result;
  }
}

export default new NewsService();
