import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
export interface IOption {
  query: string;
}
@Injectable()
export class UserService {
  mockData = [
    {
      name: 'ivan',
      surname: 'ivanov',
      patronymic: 'ivanovich',
      mail: 'test@mail.ru',
    },
    {
      name: 'nikolay',
      surname: 'nikolaev',
      patronymic: 'nvanovich',
      mail: 'nikolay@mail.ru',
    },
    {
      name: 'nikolay',
      surname: 'nikolaev',
      patronymic: 'Ivanovich',
      mail: 'nikolay@mail.ru',
    },
    {
      name: 'alexey',
      surname: 'ivanov',
      patronymic: 'ivanovich',
      mail: 'alexey@mail.ru',
    },
  ];

  createMockData() {
    for (let i = 0; i < 1000; i++) {
      this.mockData.push({
        name: faker.person.firstName().toLowerCase(),
        surname: faker.person.middleName().toLowerCase(),
        patronymic: faker.person.lastName().toLowerCase(),
        mail: faker.internet.email().toLowerCase(),
      });
    }
  }

  getFilteredUsers(options: IOption) {
    let el;
    const findIndexList = [];
    const findedDataString = [];
    const result = [];
    const findIndexMap: { [key: string]: number[] } = {};

    this.createMockData();
    const queryData = options.query.split('_');
    const mockDataJson = JSON.stringify(this.mockData);

    for (const query of queryData) {
      const regex = new RegExp(query, 'g');
      const queryBuffer: number[] = [];

      while ((el = regex.exec(JSON.stringify(this.mockData))) != null) {
        queryBuffer.push(el.index);
        findIndexList.push(el.index);
      }
      findIndexMap[query] = queryBuffer;
    }

    const jsonRegex = /\{.*}/g;
    for (const [key, indexList] of Object.entries(findIndexMap)) {
      for (const index of indexList) {
        findedDataString.push(mockDataJson.substring(index - 100, index + 100));
      }
      for (const item of findedDataString) {
        while ((el = jsonRegex.exec(item)) != null) {
          try {
            result.push(JSON.parse(el));
          } catch (e) {}
        }
      }
    }

    return [...new Map(result.map((item) => [item['mail'], item])).values()];
  }

  findJson() {}
}
