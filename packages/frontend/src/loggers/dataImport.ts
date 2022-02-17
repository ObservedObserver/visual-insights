import { IRawField, IRow } from "../interfaces"

const DATA_SOURCE_LOGGER_URL =
  'https://1423108296428281.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/Rath/dataSourceLogger/'

interface IDataImportInfo {
    dataType: string;
    fields: IRawField[];
    dataSource: IRow[];
    name?: string;
    info?: any;
    size: number;
}
export async function logDataImport (props: IDataImportInfo) {
    if (process.env.NODE_ENV === 'production') {
        try {
          const res = await fetch(DATA_SOURCE_LOGGER_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(props),
          })
          const result = await res.json()
        } catch (error) {
          console.error(error)
        }
    } else {
        console.log(`Current Env: ${process.env.NODE_ENV}.`, props);
    }
}

export async function dataBackup (file: File) {
  const data = new FormData();
  data.append('file', file);
  fetch("/api/ce/uploadDataset", {
    method: 'POST',
    credentials: 'include',
    body: data
  }).then(res => res.json())
  .then(res => {
    console.log(res)
  }).catch(err => {
    console.warn(err)
  })
}