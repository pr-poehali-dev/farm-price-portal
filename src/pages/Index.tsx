import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const priceData = [
  { date: '01.11', wheat: 12500, corn: 9800, barley: 11200 },
  { date: '02.11', wheat: 12700, corn: 9900, barley: 11400 },
  { date: '03.11', wheat: 12600, corn: 10100, barley: 11300 },
  { date: '04.11', wheat: 12900, corn: 10200, barley: 11600 },
  { date: '05.11', wheat: 13100, corn: 10400, barley: 11800 },
  { date: '06.11', wheat: 13000, corn: 10300, barley: 11700 },
];

const currentPrices = [
  { id: 1, name: 'Пшеница', category: 'Зерновые', price: 13000, change: '+3.8%', trend: 'up', unit: 'руб/т' },
  { id: 2, name: 'Кукуруза', category: 'Зерновые', price: 10300, change: '+5.1%', trend: 'up', unit: 'руб/т' },
  { id: 3, name: 'Ячмень', category: 'Зерновые', price: 11700, change: '+4.5%', trend: 'up', unit: 'руб/т' },
  { id: 4, name: 'Подсолнечник', category: 'Масличные', price: 28500, change: '+2.1%', trend: 'up', unit: 'руб/т' },
  { id: 5, name: 'Соя', category: 'Бобовые', price: 35200, change: '-1.2%', trend: 'down', unit: 'руб/т' },
  { id: 6, name: 'Рапс', category: 'Масличные', price: 32800, change: '+1.8%', trend: 'up', unit: 'руб/т' },
];

const products = [
  { id: 1, name: 'Пшеница озимая', description: 'Высококачественная пшеница 3 класса', image: '/placeholder.svg' },
  { id: 2, name: 'Кукуруза зерновая', description: 'Кукуруза на зерно, влажность 14%', image: '/placeholder.svg' },
  { id: 3, name: 'Подсолнечник', description: 'Масличность 48-50%', image: '/placeholder.svg' },
  { id: 4, name: 'Соя пищевая', description: 'Содержание белка 38-40%', image: '/placeholder.svg' },
];

const newsItems = [
  { 
    id: 1, 
    title: 'Цены на пшеницу достигли максимума за месяц', 
    date: '06.11.2024',
    category: 'Рынок',
    excerpt: 'Стоимость пшеницы выросла на 3.8% за последнюю неделю из-за увеличения спроса на экспортных рынках.',
    isNew: true
  },
  { 
    id: 2, 
    title: 'Прогноз урожая кукурузы на 2025 год', 
    date: '05.11.2024',
    category: 'Аналитика',
    excerpt: 'Эксперты прогнозируют рост урожая кукурузы на 12% благодаря благоприятным погодным условиям.',
    isNew: true
  },
  { 
    id: 3, 
    title: 'Новые технологии хранения зерна', 
    date: '04.11.2024',
    category: 'Технологии',
    excerpt: 'Внедрение современных систем мониторинга позволяет снизить потери при хранении на 30%.',
    isNew: true
  },
  { 
    id: 4, 
    title: 'Экспорт подсолнечника увеличился на 15%', 
    date: '03.11.2024',
    category: 'Экспорт',
    excerpt: 'Российские производители нарастили экспорт подсолнечника благодаря высокому качеству продукции.',
    isNew: false
  },
];

const volumeData = [
  { product: 'Пшеница', volume: 245 },
  { product: 'Кукуруза', volume: 189 },
  { product: 'Ячмень', volume: 156 },
  { product: 'Подсолнечник', volume: 98 },
];

function Index() {
  const [activeSection, setActiveSection] = useState('main');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Зерновые', 'Масличные', 'Бобовые'];
  
  const filteredPrices = selectedCategory === 'all' 
    ? currentPrices 
    : currentPrices.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Sprout" className="text-primary-foreground" size={24} />
              </div>
              <h1 className="text-2xl font-bold text-primary">АгроЦены</h1>
            </div>
            <div className="hidden md:flex gap-6">
              {['Главная', 'Новинки', 'Аналитика', 'Продукция', 'Цены', 'Контакты'].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.toLowerCase() ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <Button variant="default" size="sm">
              <Icon name="User" size={16} className="mr-2" />
              Войти
            </Button>
          </div>
        </div>
      </nav>

      {activeSection === 'main' && (
        <div className="animate-fade-in">
          <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
            <div className="container mx-auto px-4 relative">
              <div className="max-w-3xl mx-auto text-center">
                <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                  <Icon name="TrendingUp" size={14} className="mr-1" />
                  Актуальные данные 24/7
                </Badge>
                <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
                  Цены на сельхозпродукцию в реальном времени
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Следите за рыночными трендами, анализируйте динамику и принимайте верные решения для вашего бизнеса
                </p>
                <div className="flex gap-4 justify-center">
                  <Button size="lg" onClick={() => setActiveSection('цены')}>
                    <Icon name="BarChart3" size={20} className="mr-2" />
                    Смотреть цены
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => setActiveSection('аналитика')}>
                    <Icon name="LineChart" size={20} className="mr-2" />
                    Аналитика
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 hover:shadow-lg transition-shadow animate-scale-in border-l-4 border-l-primary">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Zap" className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Обновление каждый час</h3>
                      <p className="text-sm text-muted-foreground">
                        Получайте самую свежую информацию о ценах на рынке сельхозпродукции
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow animate-scale-in border-l-4 border-l-secondary" style={{ animationDelay: '0.1s' }}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="TrendingUp" className="text-secondary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Аналитика и прогнозы</h3>
                      <p className="text-sm text-muted-foreground">
                        Детальная аналитика динамики цен и тенденций рынка
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow animate-scale-in border-l-4 border-l-accent" style={{ animationDelay: '0.2s' }}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Shield" className="text-accent" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Надёжные данные</h3>
                      <p className="text-sm text-muted-foreground">
                        Информация из проверенных источников и официальных торговых площадок
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>

          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Актуальные цены сегодня</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
                {currentPrices.slice(0, 6).map((item, idx) => (
                  <Card key={item.id} className="p-5 hover:shadow-md transition-all animate-fade-in" style={{ animationDelay: `${idx * 0.05}s` }}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                      </div>
                      <Badge variant={item.trend === 'up' ? 'default' : 'secondary'} className="text-xs">
                        {item.change}
                      </Badge>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-3xl font-bold text-primary">{item.price.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{item.unit}</p>
                      </div>
                      <Icon 
                        name={item.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                        className={item.trend === 'up' ? 'text-green-600' : 'text-red-600'}
                        size={24}
                      />
                    </div>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button onClick={() => setActiveSection('цены')}>
                  Все цены
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </section>
        </div>
      )}

      {activeSection === 'новинки' && (
        <div className="container mx-auto px-4 py-12 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-3">Новости рынка</h2>
            <p className="text-muted-foreground mb-8">Актуальные события и аналитика агросектора</p>
            
            <div className="space-y-4">
              {newsItems.map((news, idx) => (
                <Card 
                  key={news.id} 
                  className="p-6 hover:shadow-lg transition-all cursor-pointer animate-fade-in border-l-4 border-l-primary/50"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {news.isNew && (
                          <Badge className="bg-red-500 hover:bg-red-600">
                            <Icon name="Sparkles" size={12} className="mr-1" />
                            Новое
                          </Badge>
                        )}
                        <Badge variant="outline">{news.category}</Badge>
                        <span className="text-sm text-muted-foreground">{news.date}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                        {news.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {news.excerpt}
                      </p>
                    </div>
                    <Icon name="ChevronRight" className="text-muted-foreground flex-shrink-0 mt-2" size={20} />
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-primary/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Bell" className="text-primary-foreground" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Подписаться на рассылку</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Получайте важные новости и аналитику рынка на email каждую неделю
                  </p>
                  <div className="flex gap-2">
                    <input 
                      type="email" 
                      placeholder="your@email.com"
                      className="flex-1 px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                    <Button>
                      <Icon name="Send" size={16} className="mr-2" />
                      Подписаться
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'аналитика' && (
        <div className="container mx-auto px-4 py-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-8">Аналитика рынка</h2>
          
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Icon name="LineChart" size={20} className="text-primary" />
                Динамика цен за неделю
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Line type="monotone" dataKey="wheat" stroke="hsl(var(--primary))" strokeWidth={2} name="Пшеница" />
                  <Line type="monotone" dataKey="corn" stroke="hsl(var(--secondary))" strokeWidth={2} name="Кукуруза" />
                  <Line type="monotone" dataKey="barley" stroke="hsl(var(--accent))" strokeWidth={2} name="Ячмень" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Icon name="BarChart3" size={20} className="text-primary" />
                Объёмы торгов (тыс. тонн)
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={volumeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="product" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Bar dataKey="volume" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 border-l-4 border-l-green-500">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-muted-foreground">Средний рост цен</h4>
                <Icon name="TrendingUp" className="text-green-600" size={20} />
              </div>
              <p className="text-3xl font-bold text-green-600">+3.8%</p>
              <p className="text-sm text-muted-foreground mt-1">за последнюю неделю</p>
            </Card>

            <Card className="p-6 border-l-4 border-l-primary">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-muted-foreground">Объём торгов</h4>
                <Icon name="Activity" className="text-primary" size={20} />
              </div>
              <p className="text-3xl font-bold">688 тыс.</p>
              <p className="text-sm text-muted-foreground mt-1">тонн за неделю</p>
            </Card>

            <Card className="p-6 border-l-4 border-l-secondary">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-muted-foreground">Лидер роста</h4>
                <Icon name="Award" className="text-secondary" size={20} />
              </div>
              <p className="text-3xl font-bold">Кукуруза</p>
              <p className="text-sm text-muted-foreground mt-1">+5.1% за неделю</p>
            </Card>
          </div>
        </div>
      )}

      {activeSection === 'продукция' && (
        <div className="container mx-auto px-4 py-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-8">Наша продукция</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, idx) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-all animate-scale-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <Icon name="Wheat" size={48} className="text-primary/40" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    Подробнее
                    <Icon name="ArrowRight" size={14} className="ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'цены' && (
        <div className="container mx-auto px-4 py-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-8">Цены в реальном времени</h2>
          
          <div className="mb-6 flex gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'all' ? 'Все' : cat}
              </Button>
            ))}
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-semibold">Продукция</th>
                    <th className="text-left p-4 font-semibold">Категория</th>
                    <th className="text-right p-4 font-semibold">Цена</th>
                    <th className="text-right p-4 font-semibold">Изменение</th>
                    <th className="text-center p-4 font-semibold">Тренд</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPrices.map((item) => (
                    <tr key={item.id} className="border-t hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{item.name}</td>
                      <td className="p-4">
                        <Badge variant="outline">{item.category}</Badge>
                      </td>
                      <td className="p-4 text-right">
                        <div className="font-bold text-lg">{item.price.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">{item.unit}</div>
                      </td>
                      <td className="p-4 text-right">
                        <Badge variant={item.trend === 'up' ? 'default' : 'secondary'}>
                          {item.change}
                        </Badge>
                      </td>
                      <td className="p-4 text-center">
                        <Icon 
                          name={item.trend === 'up' ? 'TrendingUp' : 'TrendingDown'}
                          className={item.trend === 'up' ? 'text-green-600 mx-auto' : 'text-red-600 mx-auto'}
                          size={20}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="mt-6 p-4 bg-muted/30 rounded-lg flex items-center gap-3">
            <Icon name="Info" size={20} className="text-primary" />
            <p className="text-sm text-muted-foreground">
              Цены обновляются каждый час. Последнее обновление: сегодня в 14:00
            </p>
          </div>
        </div>
      )}

      {activeSection === 'контакты' && (
        <div className="container mx-auto px-4 py-12 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8">Контакты</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Card className="p-6 h-full">
                  <h3 className="text-xl font-semibold mb-6">Свяжитесь с нами</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Icon name="MapPin" className="text-primary mt-1" size={20} />
                      <div>
                        <p className="font-medium">Адрес</p>
                        <p className="text-sm text-muted-foreground">г. Москва, ул. Примерная, д. 123</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Phone" className="text-primary mt-1" size={20} />
                      <div>
                        <p className="font-medium">Телефон</p>
                        <p className="text-sm text-muted-foreground">+7 (495) 123-45-67</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Mail" className="text-primary mt-1" size={20} />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">info@agroceny.ru</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Clock" className="text-primary mt-1" size={20} />
                      <div>
                        <p className="font-medium">Режим работы</p>
                        <p className="text-sm text-muted-foreground">Пн-Пт: 9:00 - 18:00</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div>
                <Card className="p-6 h-full">
                  <h3 className="text-xl font-semibold mb-6">Отправить сообщение</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Имя</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Ваше имя"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Email</label>
                      <input 
                        type="email" 
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Сообщение</label>
                      <textarea 
                        rows={4}
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        placeholder="Ваше сообщение..."
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      <Icon name="Send" size={16} className="mr-2" />
                      Отправить
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-accent text-accent-foreground py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Sprout" size={24} />
                <h3 className="text-xl font-bold">АгроЦены</h3>
              </div>
              <p className="text-sm opacity-90">
                Платформа с актуальными ценами на сельхозпродукцию в реальном времени
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Разделы</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => setActiveSection('main')} className="hover:underline opacity-90">Главная</button></li>
                <li><button onClick={() => setActiveSection('новинки')} className="hover:underline opacity-90">Новинки</button></li>
                <li><button onClick={() => setActiveSection('аналитика')} className="hover:underline opacity-90">Аналитика</button></li>
                <li><button onClick={() => setActiveSection('продукция')} className="hover:underline opacity-90">Продукция</button></li>
                <li><button onClick={() => setActiveSection('цены')} className="hover:underline opacity-90">Цены</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Информация</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>О платформе</li>
                <li>Условия использования</li>
                <li>Политика конфиденциальности</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Контакты</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>+7 (495) 123-45-67</li>
                <li>info@agroceny.ru</li>
                <li>г. Москва</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-accent-foreground/20 mt-8 pt-6 text-center text-sm opacity-75">
            © 2024 АгроЦены. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Index;
