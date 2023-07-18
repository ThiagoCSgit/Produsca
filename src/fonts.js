import { useFonts, OpenSans_400Regular, OpenSans_500Medium } from '@expo-google-fonts/open-sans';
import * as Font from 'expo-font';

import React, { useEffect, useState } from 'react';

export default function useCustomFonts() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        OpenSans_500Medium
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  return fontsLoaded;
};
