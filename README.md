# Animal Helper Token Contracts

Смарт-контракты для благотворительного проекта Animal Helper Token на блокчейне TON.

## Структура проекта

```
charity-token/
├── contracts/           # Смарт-контракты на языке TACT
├── tests/              # Тесты для смарт-контрактов
├── scripts/            # Скрипты деплоя и мониторинга
└── tact.config.json    # Конфигурация компилятора TACT
```

## Смарт-контракты

- `AnimalHelperToken.tact` - Основной токен проекта (AHT)
- `FundsDistributor.tact` - Контракт для распределения средств
- `AnimalHelperVoting.tact` - Контракт для голосования
- `AnimalHelperNFT.tact` - NFT контракт
- `LiquidityLock.tact` - Контракт для блокировки ликвидности
- `AnimalHelperPool.tact` - Пул ликвидности
- `JettonWallet.tact` - Кошелек для токенов

## Установка

```bash
npm install
```

## Компиляция контрактов

```bash
npm run build
```

## Тестирование

```bash
npm test
```

## Деплой

### Тестнет

```bash
npm run deploy
```

### Мейннет

1. Создайте файл `.env` на основе `.env.example`
2. Добавьте свой мнемоник и другие необходимые параметры
3. Запустите деплой:

```bash
npm run deploy:mainnet
```

## Стресс-тестирование

```bash
npm run stress-test
```

## Мониторинг

```bash
npm run monitor
```

## Лицензия

MIT 