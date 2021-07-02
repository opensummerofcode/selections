import { useState, useEffect } from 'react';
import { db } from '@/firebase';

export default function useSuggestions() {
  const [suggestions, setSuggestions] = useState({});

  useEffect(() => {
    return db.collection('suggestions').onSnapshot((snapshot) => {
      const data = snapshot.docChanges();
      const newSuggestions = data.reduce((all, s) => {
        all[s.doc.id] = s.doc.data();
        return all;
      }, {});
      setSuggestions((s) => ({ ...s, ...newSuggestions }));
    });
  }, []);

  return { suggestions };
}
