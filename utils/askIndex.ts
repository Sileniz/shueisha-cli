import readline from 'node:readline';
const askIndex = async (rl: readline.Interface, titles: Array<string | null>, callback: (index: number) => void) => {
  rl.question("\nInsira o número da obra: ", (index: string) => {
    const int: number = parseInt(index);
    if (int > titles.length - 1) {
      console.log("Número invalido");
      return askIndex(rl, titles, callback);
    }
    rl.close()
    callback(int);
  });
};

export default askIndex