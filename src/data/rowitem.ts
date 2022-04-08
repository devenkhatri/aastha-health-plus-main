import { getAirtableData } from "./helper";

export interface RowItem {
  name: string;
  source: string;
  id: string;
  url: string;
  passcode: string;
  isactive?: boolean;
}

const rowItems: RowItem[] = [];

export const getRowItems = async () => {
  const airtableRecords:any = await getAirtableData(process.env.REACT_APP_AIRTABLE_KEY, process.env.REACT_APP_AIRTABLE_BASE, process.env.REACT_APP_AIRTABLE_TABLE,'Grid view','',[])
  airtableRecords.forEach(function (record: any) {
    const item = {
      name: record.get('Name'),
      source: record.get('Source'),
      url: record.get('URL'),
      passcode: record.get('Passcode'),
      isactive: !!record.get('IsActive'),
      id: record.id
    }    
    console.log('Retrieved', item);
    rowItems.push(item);
  });  
  return rowItems;
};

export const getRowItem = (id: string) => rowItems.find(r => r.id === id);
