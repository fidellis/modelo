import React, { useState, useEffect } from 'react';
import { getData, save, destroy } from '~/lib/api';
import { formatInteger } from '~/lib/format';

export function getModelos(params) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();

  async function change() {
    setLoading(true);
    const [response] = await Promise.all([
      getData('/teste', { ...params, order: ['nome'] }),
    ]);
    setData(response);
    setLoading(false);
  }

  useEffect(() => {
    change();
  }, [params.filter]);

  return [data, loading];
}

export function getModelo({ id, ...params }) {
    const [data, setData] = useState({ sumario: [], backlog: [], sistemas: [], responsaveis: [] });
  
    async function change() {
      const [response] = await Promise.all([
        getData(`/teste/${id}`, params),
      ]);
      setData(response);
    }
  
    useEffect(() => {
      if(Number(id)) change();
    }, []);
  
    return data;
  }

