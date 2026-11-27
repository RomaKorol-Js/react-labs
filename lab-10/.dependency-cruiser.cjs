// Правила гібридної структури (§4.7) і пакета (§4.10) для dependency-cruiser:
// npm run check:deps. Правило перевіряє лише теки, які вже є: поки теки
// routes/ немає, правило про маршрути нічого не знаходить. Тому перевірка
// проходить і на стартовій структурі. Не змінюйте цей файл: це умова
// задачі, як і tests/.

/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      comment:
        'Циклічний імпорт: модулі імпортують один одного, напряму або через інші.',
      from: {},
      to: { circular: true },
    },
    {
      name: 'routes-are-independent',
      severity: 'error',
      comment:
        'Тека маршруту не імпортує теку іншого маршруту. Те, що потрібно ' +
        'двом маршрутам, переносьте в shared/ (§4.7).',
      from: { path: '^src/routes/([^/]+)/' },
      to: { path: '^src/routes/', pathNot: '^src/routes/$1/' },
    },
    {
      name: 'shared-stays-shared',
      severity: 'error',
      comment:
        'Спільний код не знає, хто ним користується: shared/ не імпортує ' +
        'app/ і routes/ (§4.7).',
      from: { path: '^src/shared/' },
      to: { path: '^src/(app|routes)/' },
    },
    {
      name: 'features-are-independent',
      severity: 'error',
      comment:
        'Функціональність (feature) не імпортує іншу. Їх поєднує маршрут, ' +
        'що стоїть вище (§4.7).',
      from: { path: '^src/shared/features/([^/]+)/' },
      to: {
        path: '^src/shared/features/',
        pathNot: '^src/shared/features/$1/',
      },
    },
    {
      name: 'shared-code-below-features',
      severity: 'error',
      comment:
        'Кнопки, хуки й утиліти в shared/ не знають функціональностей: ' +
        'shared/features/ імпортує решту shared/, а не навпаки (§4.7).',
      from: { path: '^src/shared/', pathNot: '^src/shared/features/' },
      to: { path: '^src/shared/features/' },
    },
    {
      name: 'app-on-top',
      severity: 'error',
      comment:
        'app/ — верхній рівень: він імпортує все інше, а його не імпортує ніхто (§4.7).',
      from: { path: '^src/', pathNot: '^src/app/' },
      to: { path: '^src/app/' },
    },
    {
      name: 'packages-are-independent',
      severity: 'error',
      comment: 'Пакет не імпортує застосунок (§4.10).',
      from: { path: '^packages/' },
      to: { path: '^src/' },
    },
    {
      name: 'no-deep-imports-into-packages',
      severity: 'error',
      comment:
        'Застосунок імпортує пакет лише за назвою (@coffee/cart), а не шляхом до файлу всередині пакета (§4.10).',
      from: { path: '^src/' },
      to: { path: '^packages/', pathNot: '^packages/[^/]+/index\\.js$' },
    },
    {
      name: 'not-reachable-from-main',
      severity: 'warn',
      comment:
        'Цей файл не імпортує ніхто, починаючи з main.jsx: мертвий код. ' +
        'Файл, який ще реекспортує index.js, сюди не потрапить.',
      from: { path: 'main\\.jsx$' },
      to: {
        path: '^src/',
        pathNot: ['main\\.jsx$', '\\.css$'],
        reachable: false,
      },
    },
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
  },
}
