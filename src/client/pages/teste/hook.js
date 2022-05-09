import { useState, useEffect } from 'react';
import { getData } from '~/lib/api';

export function getRows(params) {
  const [data, setData] = useState([]);

  async function change() {
    const response = await getData('/teste', { ...params, order: ['nome'] });
    setData(response);
  }

  useEffect(() => {
    change();
  }, [params]);

  return data;
}