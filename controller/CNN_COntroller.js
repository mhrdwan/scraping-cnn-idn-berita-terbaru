const axios = require('axios')
const cheerio = require('cheerio')

export const datacari = async (req,res) => {
    try {
        const response = await axios.get('https://www.cnnindonesia.com/');
        const html = response.data;
        const $ = cheerio.load(html);

        let items = [];

        $('.nhl-list > .flex-grow').each((index, element) => {
            const title = $(element).find('h2').text()
            const tag = $(element).find('.text-xs.text-cnn_red').text()
            const link = $(element).find('a').attr('href');
            // console.log(tag)
            items.push({
                no: index + 1,
                judul: title,
                tagberita: tag,
                linkberita: link,
            })
        });
        res.send(items);

    } catch (error) {
        console.error("Error fetching data: ", error);
        return [];
    }
}

export const getisiberita = async (link) => {
    try {
        const response = await axios.get(`${link}`);
        const html = response.data;
        const $ = cheerio.load(html);

        let items = [];

        $('.container ').each((index, element) => {
            const title = $(element).find('h1').text().trim();
            const isi = $(element).find('p').text().trim();
            const img = $(element).find('.detail-image img');
            const imgSrc = img.attr('src'); // Dapatkan nilai src
            const imgTitle = img.attr('title')
            console.log(imgTitle);
            if (title && isi) {
                items.push({
                    title,
                    imgSrc,
                    imgTitle,
                    isi,
                });
            }
        });
        return items

    } catch (error) {
        console.error("Error fetching data: ", error);
        return [];
    }
}