import React, { useState, useEffect } from 'react';
import { getData, save, destroy } from '~/lib/api';
import { formatInteger } from '~/lib/format';

export function getRows(params) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();

  async function change() {
    const response = await Promise.resolve(getData('/teste', { ...params, order: ['nome'] }));
    setData(response);
  }

  useEffect(() => {
    change();
  }, [params.filter]);

  return data;
}

export function getRow({ id, ...params }) {
  const [data, setData] = useState({ usuarioInclusao: {} });

  async function change() {
    const response = await Promise.resolve(getData(`/teste/${id}`, params));
    setData(response);
  }

  useEffect(() => {
    if (Number(id)) change();
  }, []);

  return data;
}

