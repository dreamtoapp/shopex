'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from '@/components/link';
import { Icon } from '@/components/icons/Icon';
import PhaseCard from './components/PhaseCard';
import ActionCard from './components/ActionCard';
import CollapsibleSection from './components/CollapsibleSection';
import QuickNav from './components/QuickNav';

const AdminGuidelinesPage = () => (
  <div className="relative" dir="rtl">
    <QuickNav />
    <div
      className='max-h-screen overflow-y-auto rounded-xl border border-border bg-background p-4 sm:p-6 lg:p-8 text-right shadow-lg mx-auto max-w-5xl'
      style={{ maxHeight: '90vh' }}
    >
      {/* Welcome Section - Enhanced */}
      <section id="welcome" className="mb-8">
        <Card className='border-primary/30 bg-gradient-to-br from-primary/5 via-background to-background shadow-xl'>
          <CardHeader className="pb-4">
            <CardTitle className='text-2.5xl sm:text-3xl font-bold text-primary flex items-center gap-3 mb-3'>
              <div className="p-3 rounded-xl bg-primary/10">
                <Icon name="BookOpen" className="h-8 w-8 text-primary" />
              </div>
              دليل استخدام لوحة التحكم
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <p className='text-muted-foreground text-base sm:text-lg leading-relaxed'>
              مرحباً بك في لوحة تحكم متجرك! هذا الدليل الشامل سيرشدك خطوة بخطوة لإعداد وإدارة متجرك بسهولة وكفاءة.
            </p>
            <div className='bg-primary/10 p-4 sm:p-5 rounded-xl border border-primary/30 shadow-sm'>
              <p className='font-semibold text-primary mb-2 flex items-center gap-2'>
                <Icon name="Info" className="h-5 w-5" />
                نصيحة سريعة
              </p>
              <p className='text-sm flex items-center gap-2 flex-wrap leading-relaxed'>
                يمكنك الوصول إلى لوحة التحكم في أي وقت من خلال النقر على أيقونة
                <span className='inline-flex items-center justify-center p-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90 transition-colors min-h-[44px] min-w-[44px]'>
                  <Icon name="Focus" className="h-4 w-4" />
                </span>
                في أعلى الصفحة الرئيسية.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Homepage Preview Section - Enhanced */}
      <section id="preview" className="mb-8">
        <Card className='border-primary/30 bg-gradient-to-br from-primary/5 to-background'>
          <CardHeader>
            <CardTitle className='text-xl sm:text-2xl font-bold text-primary flex items-center gap-2'>
              <Icon name="Eye" className="h-6 w-6" />
              معاينة الصفحة الرئيسية
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <p className='text-muted-foreground leading-relaxed'>
              يمكنك معاينة كيف تظهر الصفحة الرئيسية للعملاء من خلال صفحة المعاينة المخصصة.
            </p>
            <Link href="/dashboard/management/guidelines/preview">
              <Button className="flex items-center gap-2 min-h-[44px] text-base font-semibold shadow-md">
                <Icon name="Eye" className="h-5 w-5" />
                عرض المعاينة
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Phase 1: Initial Setup */}
      <section id="phase-1" className="mb-8">
        <PhaseCard
          phaseNumber={1}
          title="الإعداد الأولي"
          description="هذه الخطوات ضرورية لبدء عمل المتجر. يجب إكمالها قبل إضافة المنتجات."
          variant="destructive"
          isRequired={true}
          timeEstimate="15-20 دقيقة"
          defaultOpen={true}
        >
          <div className='space-y-4'>
            <ActionCard
              title="معلومات المتجر الأساسية"
              href="/dashboard/management/settings/company-profile"
              icon="Building2"
              variant="danger"
              items={[
                'اسم المتجر الكامل',
                'البريد الإلكتروني',
                'رقم الهاتف',
                'رقم واتساب',
                'الرقم الضريبي',
                'رقم السجل التجاري',
              ]}
            />

            <ActionCard
              title="الموقع والعنوان"
              href="/dashboard/management/settings/location"
              icon="MapPin"
              variant="danger"
              items={[
                'عنوان المتجر الكامل',
                'إحداثيات الموقع (خطوط الطول والعرض)',
              ]}
            />

            <ActionCard
              title="إعدادات المنصة"
              href="/dashboard/management/settings/platform"
              icon="Settings"
              variant="warning"
              items={[
                'العملة الافتراضية',
                'إعدادات OTP (التحقق عبر واتساب أو البريد الإلكتروني)',
                'إعدادات رفع الصور (Cloudinary)',
                'إعدادات البريد الإلكتروني (SMTP) - اختياري',
              ]}
            />

            <ActionCard
              title="التحقق من صحة البيانات"
              href="/dashboard/management/health-status"
              icon="Activity"
              variant="info"
              description="بعد إكمال الخطوات السابقة، تحقق من صفحة 'صحة المتجر' للتأكد من اكتمال جميع البيانات المطلوبة."
            />
          </div>
        </PhaseCard>
      </section>

      {/* Phase 2: Content Setup */}
      <section id="phase-2" className="mb-8">
        <PhaseCard
          phaseNumber={2}
          title="إعداد المحتوى"
          description="يجب إعداد هذه العناصر قبل البدء في إضافة المنتجات."
          variant="secondary"
          isRequired={true}
          timeEstimate="10-15 دقيقة"
        >
          <div className='space-y-4'>
            <ActionCard
              title="التصنيفات"
              href="/dashboard/management-categories"
              icon="Tags"
              description="أنشئ تصنيفات المنتجات أولاً (مثل: ملابس، إلكترونيات، أطعمة). كل منتج يحتاج تصنيف قبل إضافته."
              items={[
                'بعد إنشاء التصنيف، ستجد مربع الصورة في بطاقة التصنيف',
                'انقر على مربع الصورة (أو أيقونة +)',
                'اختر الصورة من جهازك',
                'ستُرفع الصورة تلقائياً وتظهر في البطاقة',
              ]}
            />

            <ActionCard
              title="الموردين"
              href="/dashboard/management-suppliers"
              icon="Warehouse"
              description="أضف معلومات الموردين والشركات التي تتعامل معها."
            />

            <ActionCard
              title="المناوبات"
              href="/dashboard/management/shifts"
              icon="Clock"
              description="حدد أوقات التوصيل المتاحة للعملاء (مثل: صباح، ظهر، مساء)."
            />
          </div>
        </PhaseCard>
      </section>

      {/* Phase 3: Products & Offers */}
      <section id="phase-3" className="mb-8">
        <PhaseCard
          phaseNumber={3}
          title="المنتجات والعروض"
          description="الآن يمكنك البدء في إضافة المنتجات والعروض الترويجية."
          variant="default"
          timeEstimate="متغير"
        >
          <div className='space-y-4'>
            <ActionCard
              title="المنتجات"
              href="/dashboard/management-products"
              icon="Package"
              items={[
                'اضغط على "إضافة منتج جديد"',
                'املأ جميع الحقول المطلوبة (الاسم، السعر، الكمية)',
                'اختر التصنيف المناسب',
                'حدد المورد إذا كان متوفراً',
                'انقر على مربع الصورة لإضافة صورة المنتج',
                'احفظ المنتج',
              ]}
            />

            <ActionCard
              title="العروض الترويجية"
              href="/dashboard/management-offer"
              icon="Tag"
              items={[
                'أنشئ عروض ترويجية لجذب العملاء',
                'حدد نسبة الخصم',
                'أضف المنتجات المراد عرضها',
                'فعّل العرض عند الجاهزية',
              ]}
            />
          </div>
        </PhaseCard>
      </section>

      {/* Phase 4: Branding & Policies */}
      <section id="phase-4" className="mb-8">
        <PhaseCard
          phaseNumber={4}
          title="الهوية والسياسات"
          description="عزز هوية متجرك وحدد السياسات المهمة."
          variant="outline"
          timeEstimate="20-30 دقيقة"
        >
          <div className='space-y-4'>
            <ActionCard
              title="الهوية البصرية"
              href="/dashboard/management/settings/branding"
              icon="Image"
              description="أضف شعار المتجر وصور الهيرو لتعزيز الهوية البصرية."
            />

            <Card className="p-5 rounded-xl border">
              <h4 className='font-semibold mb-3 flex items-center gap-2'>
                <Icon name="FileText" className="h-5 w-5" />
                السياسات
              </h4>
              <div className='space-y-2'>
                <Link href="/dashboard/management/policies/privacy" className="block p-3 rounded-lg text-sm">
                  سياسة الخصوصية
                </Link>
                <Link href="/dashboard/management/policies/return" className="block p-3 rounded-lg text-sm">
                  سياسة الإرجاع
                </Link>
                <Link href="/dashboard/management/policies/shipping" className="block p-3 rounded-lg text-sm">
                  سياسة الشحن
                </Link>
                <Link href="/dashboard/management/policies/website" className="block p-3 rounded-lg text-sm">
                  سياسة الموقع
                </Link>
              </div>
            </Card>

            <ActionCard
              title="صفحة من نحن"
              href="/dashboard/management/about"
              icon="Info"
              description="أضف معلومات عن متجرك، مهمتك، وميزاتك المميزة."
            />
          </div>
        </PhaseCard>
      </section>

      {/* Phase 6: Advanced Features */}
      <section id="phase-6" className="mb-8">
        <PhaseCard
          phaseNumber={6}
          title="الميزات المتقدمة"
          description="ميزات إضافية لتحسين أداء متجرك."
          variant="outline"
          timeEstimate="اختياري"
        >
          <div className='space-y-4'>
            <ActionCard
              title="التقارير والتحليلات"
              href="/dashboard/management-reports"
              icon="BarChart3"
              description="تابع المبيعات، الربحية، أداء المنتجات، وإنجازات المتجر."
            />

            <ActionCard
              title="التسويق عبر البريد الإلكتروني"
              href="/dashboard/management/client-news"
              icon="Mailbox"
              description="أرسل نشرات إخبارية وعروض خاصة للعملاء المشتركين."
            />

            <ActionCard
              title="تحسين محركات البحث (SEO)"
              href="/dashboard/management-seo"
              icon="Search"
              description="حسّن ظهور متجرك في نتائج البحث لزيادة الزيارات."
            />
          </div>
        </PhaseCard>
      </section>

      {/* Daily Operations Guide */}
      <section id="daily" className="mb-8">
        <Card className='mb-8'>
          <CardHeader>
            <CardTitle className='text-xl sm:text-2xl font-bold text-primary flex items-center gap-2'>
              <Icon name="Calendar" className="h-6 w-6" />
              دليل العمليات اليومية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='p-5 bg-info-soft-bg rounded-xl border border-info-fg/20'>
              <h4 className='font-semibold mb-3 flex items-center gap-2 text-info-fg'>
                <Icon name="CheckCircle" className="h-5 w-5" />
                الروتين اليومي الموصى به
              </h4>
              <ol className='list-decimal space-y-2 pr-6 text-sm text-muted-foreground leading-relaxed'>
                <li>تحقق من الطلبات الجديدة في &quot;قيد المراجعة&quot;</li>
                <li>راجع المخزون وتحديث الكميات المتاحة</li>
                <li>رد على استفسارات العملاء من &quot;الدعم&quot;</li>
                <li>راجع التقارير اليومية للمبيعات</li>
                <li>تأكد من تحديث العروض الترويجية</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Image Upload Guidelines - Collapsible */}
      <section id="images" className="mb-8">
        <CollapsibleSection title="دليل رفع الصور" icon="Image">
          <div className='space-y-6'>
            <div className='p-5 bg-info-soft-bg rounded-xl border border-info-fg/20'>
              <h4 className='font-semibold mb-3 text-info-fg flex items-center gap-2'>
                <Icon name="Info" className="h-5 w-5" />
                كيفية رفع الصور
              </h4>
              <div className='space-y-3 text-sm text-muted-foreground leading-relaxed'>
                <div>
                  <p className='font-semibold mb-2 text-foreground'>للمنتجات والتصنيفات والموردين:</p>
                  <ol className='list-decimal space-y-2 pr-6'>
                    <li>ابحث عن منطقة الصورة (مربع الصورة أو أيقونة +)</li>
                    <li>انقر على منطقة الصورة لفتح نافذة اختيار الملف</li>
                    <li>اختر الصورة من جهازك (JPEG، PNG، WebP، أو AVIF)</li>
                    <li>انتظر حتى يكتمل الرفع (ستظهر شريطة تقدم)</li>
                    <li>بعد اكتمال الرفع، ستظهر الصورة تلقائياً</li>
                  </ol>
                </div>
                <div className='mt-4 p-3 bg-info-soft-bg/50 rounded-lg border border-info-fg/30'>
                  <p className='font-semibold mb-1 text-info-fg'>💡 ملاحظة:</p>
                  <p>بعض النماذج تحتوي على زر &quot;حفظ الصورة&quot; - اضغط عليه بعد اختيار الصورة لإكمال الرفع.</p>
                </div>
              </div>
            </div>

            <div className='grid md:grid-cols-2 gap-4'>
              <Card className="p-5 rounded-xl">
                <h4 className='font-semibold mb-3'>📐 صيغ الصور الموصى بها:</h4>
                <ul className='list-disc space-y-1 pr-6 text-sm text-muted-foreground leading-relaxed'>
                  <li><b>WebP</b> - الأفضل لجودة عالية وحجم صغير</li>
                  <li><b>JPEG</b> - للصور العادية</li>
                  <li><b>PNG</b> - للصور التي تحتاج خلفية شفافة</li>
                  <li><b>AVIF</b> - صيغة حديثة عالية الجودة</li>
                </ul>
              </Card>

              <Card className="p-5 rounded-xl">
                <h4 className='font-semibold mb-3'>📏 الأبعاد الموصى بها:</h4>
                <ul className='list-disc space-y-2 pr-6 text-sm text-muted-foreground leading-relaxed'>
                  <li><b>صور المنتجات:</b> 800×800 بكسل</li>
                  <li><b>صور التصنيفات:</b> 800×800 بكسل</li>
                  <li><b>شعار المتجر:</b> 300×100 بكسل</li>
                  <li><b>صور الموردين:</b> 200×200 بكسل</li>
                  <li><b>صور العروض:</b> 1200×630 بكسل</li>
                  <li><b>صور السلايدر:</b> 1920×600 بكسل</li>
                </ul>
              </Card>
            </div>

            <div className='grid md:grid-cols-2 gap-4'>
              <Card className="p-5 bg-warning-soft-bg border-warning-fg/20 rounded-xl">
                <h4 className='font-semibold mb-3 text-warning-fg'>⚠️ ملاحظات مهمة:</h4>
                <ul className='list-disc space-y-1 pr-6 text-sm text-muted-foreground leading-relaxed'>
                  <li>الحد الأقصى لحجم الصورة: <b>5 ميجابايت</b></li>
                  <li>تأكد من وضوح الصورة وجودتها</li>
                  <li>تجنب الصور التي تحتوي على علامات مائية</li>
                  <li>لا ترفع صوراً مخالفة للسياسات</li>
                </ul>
              </Card>

              <Card className="p-5 bg-success-soft-bg border-success-fg/20 rounded-xl">
                <h4 className='font-semibold mb-3 text-success-fg'>✅ نصائح للحصول على أفضل النتائج:</h4>
                <ul className='list-disc space-y-1 pr-6 text-sm text-muted-foreground leading-relaxed'>
                  <li>استخدم صور عالية الجودة وواضحة</li>
                  <li>تأكد من أن المنتج يظهر بوضوح في وسط الصورة</li>
                  <li>استخدم خلفية محايدة أو شفافة للمنتجات</li>
                  <li>قم بضغط الصور قبل الرفع</li>
                </ul>
              </Card>
            </div>
          </div>
        </CollapsibleSection>
      </section>

      {/* Troubleshooting & FAQs - Collapsible */}
      <section id="faq" className="mb-8">
        <CollapsibleSection title="الأسئلة الشائعة والدعم" icon="HelpCircle">
          <div className='space-y-4'>
            <Card className="p-5 rounded-xl">
              <h4 className='font-semibold mb-2'>❓ كيف أتحقق من اكتمال بيانات المتجر؟</h4>
              <p className='text-sm text-muted-foreground leading-relaxed'>
                اذهب إلى <Link href="/dashboard/management/health-status" className="text-primary hover:underline font-medium">صحة المتجر</Link> لمعرفة البيانات الناقصة والأولوية.
              </p>
            </Card>

            <Card className="p-5 rounded-xl">
              <h4 className='font-semibold mb-2'>❓ كيف أضيف منتج جديد؟</h4>
              <p className='text-sm text-muted-foreground leading-relaxed'>
                اذهب إلى <Link href="/dashboard/management-products" className="text-primary hover:underline font-medium">المنتجات</Link> واضغط &quot;إضافة منتج جديد&quot;، تأكد من وجود تصنيف أولاً.
              </p>
            </Card>

            <Card className="p-5 rounded-xl">
              <h4 className='font-semibold mb-2'>❓ كيف أتحقق من الطلبات الجديدة؟</h4>
              <p className='text-sm text-muted-foreground leading-relaxed'>
                اذهب إلى <Link href="/dashboard/management-orders/status/pending" className="text-primary hover:underline font-medium">قيد المراجعة</Link> لرؤية جميع الطلبات الجديدة.
              </p>
            </Card>

            <Card className="p-5 rounded-xl">
              <h4 className='font-semibold mb-2'>❓ كيف أضيف مورد جديد؟</h4>
              <p className='text-sm text-muted-foreground leading-relaxed'>
                اذهب إلى <Link href="/dashboard/management-suppliers" className="text-primary hover:underline font-medium">الموردين</Link> واضغط &quot;إضافة شركة جديدة&quot;.
              </p>
            </Card>

            <Card className="p-5 rounded-xl">
              <h4 className='font-semibold mb-2'>❓ ما هي أفضل صيغة للصور؟</h4>
              <p className='text-sm text-muted-foreground leading-relaxed'>
                WebP هي الأفضل، تليها JPEG للصور العادية و PNG للصور التي تحتاج خلفية شفافة.
              </p>
            </Card>

            <Card className='p-5 bg-primary/5 rounded-xl border border-primary/20'>
              <p className='text-sm font-semibold text-primary mb-2 flex items-center gap-2'>
                <Icon name="MessageCircle" className="h-4 w-4" />
                تحتاج مساعدة إضافية؟
              </p>
              <p className='text-sm text-muted-foreground leading-relaxed'>
                راجع <Link href="/dashboard/management/client-submission" className="text-primary hover:underline font-medium">قسم الدعم</Link> أو تواصل مع الفريق التقني.
              </p>
            </Card>
          </div>
        </CollapsibleSection>
      </section>

      {/* Quick Links Footer */}
      <div className='mt-8 p-5 bg-muted/50 rounded-xl border'>
        <p className='text-sm font-semibold mb-4 flex items-center gap-2'>🔗 روابط سريعة:</p>
        <div className='flex flex-wrap gap-2'>
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="min-h-[44px]">لوحة التحكم</Button>
          </Link>
          <Link href="/dashboard/management/health-status">
            <Button variant="outline" size="sm" className="min-h-[44px]">صحة المتجر</Button>
          </Link>
          <Link href="/dashboard/management/settings">
            <Button variant="outline" size="sm" className="min-h-[44px]">الإعدادات</Button>
          </Link>
          <Link href="/dashboard/management-orders">
            <Button variant="outline" size="sm" className="min-h-[44px]">الطلبات</Button>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default AdminGuidelinesPage;
