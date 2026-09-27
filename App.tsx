import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

type Tab = 'today' | 'schedule' | 'progress';

const subjects = [
  { name: 'Mathematics', detail: 'Calculus review', minutes: 45, color: '#E6F4F1', icon: 'calculator-outline' as const },
  { name: 'Biology', detail: 'Cell structure', minutes: 30, color: '#FFF0E4', icon: 'leaf-outline' as const },
  { name: 'Literature', detail: 'The Great Gatsby', minutes: 20, color: '#F1ECF8', icon: 'book-outline' as const },
];

const week = [
  { day: 'M', date: '22', kind: 'study' },
  { day: 'T', date: '23', kind: 'study' },
  { day: 'W', date: '24', kind: 'today' },
  { day: 'T', date: '25', kind: 'study' },
  { day: 'F', date: '26', kind: 'break' },
  { day: 'S', date: '27', kind: 'study' },
  { day: 'S', date: '28', kind: 'break' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('today');
  const [showLogger, setShowLogger] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [loggedMinutes, setLoggedMinutes] = useState(0);
  const [plannedDays, setPlannedDays] = useState(['M', 'T', 'W', 'T', 'S']);

  const logSession = () => {
    setLoggedMinutes((minutes) => minutes + 25);
    setShowLogger(false);
  };

  const toggleDay = (day: string) => {
    setPlannedDays((days) => days.includes(day) ? days.filter((item) => item !== day) : [...days, day]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <View>
            <Text style={styles.eyebrow}>WEDNESDAY, OCTOBER 24</Text>
            <Text style={styles.title}>Good morning, Alex</Text>
          </View>
          <Pressable style={styles.avatar} accessibilityLabel="Open profile">
            <Text style={styles.avatarText}>A</Text>
          </Pressable>
        </View>

        {activeTab === 'today' && (
          <>
            <View style={styles.streakCard}>
              <View>
                <View style={styles.streakHeading}>
                  <Ionicons name="flame" size={19} color="#F06B4F" />
                  <Text style={styles.streakLabel}>CURRENT STREAK</Text>
                </View>
                <Text style={styles.streakNumber}>12 <Text style={styles.streakDays}>days</Text></Text>
                <Text style={styles.streakCopy}>You are on a roll. Keep your rhythm going.</Text>
              </View>
              <View style={styles.streakCircle}>
                <Text style={styles.circleText}>12</Text>
                <Text style={styles.circleCaption}>DAY RUN</Text>
              </View>
            </View>

            <View style={styles.weekRow}>
              {week.map((item, index) => (
                <View key={`${item.day}-${index}`} style={styles.dayItem}>
                  <Text style={styles.dayName}>{item.day}</Text>
                  <View style={[styles.dayCircle, item.kind === 'today' && styles.todayCircle, item.kind === 'break' && styles.breakCircle]}>
                    {item.kind === 'study' ? <Ionicons name="checkmark" size={16} color="#197A68" /> : item.kind === 'today' ? <Text style={styles.todayText}>{item.date}</Text> : <Ionicons name="remove" size={15} color="#A7A19A" />}
                  </View>
                  <Text style={[styles.dayDate, item.kind === 'today' && styles.todayDate]}>{item.kind === 'today' ? 'Today' : item.date}</Text>
                </View>
              ))}
            </View>

            <View style={styles.sectionHeader}>
              <View><Text style={styles.sectionTitle}>Today&apos;s focus</Text><Text style={styles.sectionSub}>2h 15m planned</Text></View>
              <Pressable onPress={() => setActiveTab('schedule')}><Text style={styles.linkText}>View plan</Text></Pressable>
            </View>

            <View style={styles.focusCard}>
              <View style={styles.focusIcon}><Ionicons name="book" size={21} color="#197A68" /></View>
              <View style={styles.focusContent}><Text style={styles.focusTitle}>Calculus review</Text><Text style={styles.focusMeta}>Mathematics  ·  9:00 AM - 9:45 AM</Text></View>
              <View style={styles.focusStatus}><Ionicons name="checkmark-circle" size={21} color="#197A68" /></View>
            </View>
            <View style={styles.focusCard}>
              <View style={[styles.focusIcon, { backgroundColor: '#FFF0E4' }]}><Ionicons name="leaf" size={21} color="#D16C36" /></View>
              <View style={styles.focusContent}><Text style={styles.focusTitle}>Cell structure</Text><Text style={styles.focusMeta}>Biology  ·  10:00 AM - 10:30 AM</Text></View>
              <View style={styles.upNext}><Text style={styles.upNextText}>NEXT</Text></View>
            </View>

            {showLogger && (
              <View style={styles.loggerCard}>
                <View style={styles.loggerHeader}><Text style={styles.loggerTitle}>Log a study session</Text><Pressable onPress={() => setShowLogger(false)}><Ionicons name="close" size={21} color="#756F68" /></Pressable></View>
                <Text style={styles.inputLabel}>SUBJECT</Text>
                <View style={styles.subjectPicker}>{subjects.map((subject) => <Pressable key={subject.name} onPress={() => setSelectedSubject(subject.name)} style={[styles.subjectChip, selectedSubject === subject.name && styles.subjectChipActive]}><Text style={[styles.subjectChipText, selectedSubject === subject.name && styles.subjectChipTextActive]}>{subject.name}</Text></Pressable>)}</View>
                <View style={styles.durationRow}><Text style={styles.durationText}>25 minutes</Text><Pressable style={styles.saveButton} onPress={logSession}><Text style={styles.saveButtonText}>Save session</Text></Pressable></View>
              </View>
            )}
            {!showLogger && <Pressable style={styles.logButton} onPress={() => setShowLogger(true)}><Ionicons name="add" size={21} color="#FFFFFF" /><Text style={styles.logButtonText}>Log study session</Text></Pressable>}
            {loggedMinutes > 0 && <Text style={styles.loggedNote}>Nice work. {loggedMinutes} extra minutes added to your progress.</Text>}
          </>
        )}

        {activeTab === 'schedule' && <Schedule plannedDays={plannedDays} toggleDay={toggleDay} />}
        {activeTab === 'progress' && <Progress loggedMinutes={loggedMinutes} />}
      </ScrollView>

      <View style={styles.tabBar}>
        <TabButton icon="today-outline" label="Today" active={activeTab === 'today'} onPress={() => setActiveTab('today')} />
        <TabButton icon="calendar-outline" label="Schedule" active={activeTab === 'schedule'} onPress={() => setActiveTab('schedule')} />
        <TabButton icon="bar-chart-outline" label="Progress" active={activeTab === 'progress'} onPress={() => setActiveTab('progress')} />
      </View>
    </SafeAreaView>
  );
}

function TabButton({ icon, label, active, onPress }: { icon: keyof typeof Ionicons.glyphMap; label: string; active: boolean; onPress: () => void }) {
  return <Pressable onPress={onPress} style={styles.tabButton}><Ionicons name={icon} size={22} color={active ? '#197A68' : '#A7A19A'} /><Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text></Pressable>;
}

function Schedule({ plannedDays, toggleDay }: { plannedDays: string[]; toggleDay: (day: string) => void }) {
  return <>
    <View style={styles.pageIntro}><Text style={styles.pageTitle}>Your schedule</Text><Text style={styles.pageCopy}>Design a week that gives your focus room to breathe.</Text></View>
    <View style={styles.scheduleCard}><View style={styles.scheduleCardHeader}><Text style={styles.cardTitle}>Study days</Text><Text style={styles.cardHint}>{plannedDays.length} days planned</Text></View><View style={styles.scheduleDays}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => { const selected = plannedDays.includes(day) && (day !== 'T' || index === 1 || index === 3); return <Pressable key={`${day}-${index}`} onPress={() => toggleDay(day)} style={[styles.scheduleDay, selected && styles.scheduleDaySelected]}><Text style={[styles.scheduleDayText, selected && styles.scheduleDayTextSelected]}>{day}</Text></Pressable>; })}</View></View>
    <View style={styles.breakBanner}><View style={styles.breakIcon}><Ionicons name="cafe-outline" size={21} color="#D16C36" /></View><View style={styles.breakContent}><Text style={styles.breakTitle}>Friday is a break day</Text><Text style={styles.breakCopy}>Rest is part of the plan, not a detour.</Text></View><Ionicons name="checkmark-circle" size={21} color="#D16C36" /></View>
    <Text style={styles.sectionTitle}>Upcoming sessions</Text>
    {subjects.map((subject, index) => <View key={subject.name} style={styles.scheduleSession}><View style={[styles.sessionMarker, { backgroundColor: subject.color }]}><Ionicons name={subject.icon} size={20} color="#197A68" /></View><View style={styles.focusContent}><Text style={styles.focusTitle}>{subject.name}</Text><Text style={styles.focusMeta}>{index === 0 ? 'Thursday · 9:00 AM' : index === 1 ? 'Saturday · 10:30 AM' : 'Sunday · 2:00 PM'}</Text></View><Text style={styles.sessionDuration}>{subject.minutes}m</Text></View>)}
  </>;
}

function Progress({ loggedMinutes }: { loggedMinutes: number }) {
  return <>
    <View style={styles.pageIntro}><Text style={styles.pageTitle}>Your progress</Text><Text style={styles.pageCopy}>Small sessions become a pattern worth keeping.</Text></View>
    <View style={styles.progressGrid}><View style={styles.metricCard}><Ionicons name="time-outline" size={21} color="#197A68" /><Text style={styles.metricValue}>{135 + loggedMinutes}m</Text><Text style={styles.metricLabel}>THIS WEEK</Text></View><View style={styles.metricCard}><Ionicons name="flame-outline" size={21} color="#F06B4F" /><Text style={styles.metricValue}>12</Text><Text style={styles.metricLabel}>DAY STREAK</Text></View></View>
    <View style={styles.chartCard}><View style={styles.scheduleCardHeader}><Text style={styles.cardTitle}>Study time by subject</Text><Text style={styles.cardHint}>This week</Text></View>{subjects.map((subject) => <View key={subject.name} style={styles.progressRow}><View style={styles.progressRowTop}><Text style={styles.focusTitle}>{subject.name}</Text><Text style={styles.sessionDuration}>{subject.minutes + (subject.name === 'Mathematics' ? loggedMinutes : 0)}m</Text></View><View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${Math.min(subject.minutes * 1.6, 100)}%`, backgroundColor: subject.name === 'Biology' ? '#D16C36' : subject.name === 'Literature' ? '#7A61A8' : '#197A68' }]} /></View></View>)}</View>
    <View style={styles.milestone}><Ionicons name="sparkles-outline" size={21} color="#197A68" /><View style={styles.focusContent}><Text style={styles.focusTitle}>You are 15 minutes from your weekly goal</Text><Text style={styles.focusMeta}>One focused session will get you there.</Text></View></View>
  </>;
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8F6F1' }, page: { padding: 22, paddingBottom: 115 }, topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }, eyebrow: { color: '#8B847A', fontSize: 10, fontWeight: '700', letterSpacing: 1.2, marginBottom: 7 }, title: { color: '#25221F', fontSize: 25, fontWeight: '800' }, avatar: { width: 43, height: 43, borderRadius: 22, backgroundColor: '#E3C9A9', justifyContent: 'center', alignItems: 'center' }, avatarText: { color: '#674B32', fontSize: 16, fontWeight: '800' }, streakCard: { backgroundColor: '#DDEFE8', borderRadius: 22, padding: 21, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }, streakHeading: { flexDirection: 'row', alignItems: 'center', gap: 7 }, streakLabel: { color: '#197A68', fontSize: 10, fontWeight: '800', letterSpacing: 1 }, streakNumber: { color: '#173E37', fontSize: 38, fontWeight: '800', marginTop: 5 }, streakDays: { fontSize: 15, fontWeight: '600' }, streakCopy: { color: '#47756C', fontSize: 12, marginTop: 2, maxWidth: 170 }, streakCircle: { width: 84, height: 84, borderRadius: 42, borderWidth: 1, borderColor: '#A9D2C6', alignItems: 'center', justifyContent: 'center' }, circleText: { color: '#197A68', fontSize: 25, fontWeight: '800' }, circleCaption: { color: '#47756C', fontSize: 8, fontWeight: '800', letterSpacing: 1 }, weekRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 27 }, dayItem: { alignItems: 'center', gap: 7 }, dayName: { fontSize: 11, color: '#9B948B', fontWeight: '700' }, dayCircle: { width: 33, height: 33, borderRadius: 17, backgroundColor: '#E0F0EA', alignItems: 'center', justifyContent: 'center' }, todayCircle: { backgroundColor: '#197A68' }, breakCircle: { backgroundColor: '#EDE9E2' }, todayText: { color: '#FFFFFF', fontWeight: '800', fontSize: 12 }, dayDate: { color: '#A49D94', fontSize: 10 }, todayDate: { color: '#197A68', fontWeight: '800' }, sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }, sectionTitle: { color: '#302C28', fontSize: 18, fontWeight: '800', marginBottom: 3 }, sectionSub: { color: '#938B82', fontSize: 12 }, linkText: { color: '#197A68', fontSize: 12, fontWeight: '800' }, focusCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 15, flexDirection: 'row', alignItems: 'center', marginBottom: 10, shadowColor: '#3E332A', shadowOpacity: 0.05, shadowRadius: 12, elevation: 2 }, focusIcon: { width: 42, height: 42, borderRadius: 13, backgroundColor: '#E6F4F1', alignItems: 'center', justifyContent: 'center', marginRight: 12 }, focusContent: { flex: 1 }, focusTitle: { color: '#37322D', fontSize: 14, fontWeight: '800' }, focusMeta: { color: '#9A9289', fontSize: 11, marginTop: 5 }, focusStatus: { marginLeft: 8 }, upNext: { backgroundColor: '#FFF2E7', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 7 }, upNextText: { color: '#D16C36', fontSize: 9, fontWeight: '800' }, logButton: { height: 52, backgroundColor: '#197A68', borderRadius: 14, marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }, logButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' }, loggedNote: { textAlign: 'center', color: '#197A68', fontSize: 11, marginTop: 12 }, loggerCard: { backgroundColor: '#FFFFFF', borderRadius: 17, padding: 17, marginTop: 10, shadowColor: '#3E332A', shadowOpacity: 0.07, shadowRadius: 12, elevation: 2 }, loggerHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 17 }, loggerTitle: { color: '#302C28', fontSize: 16, fontWeight: '800' }, inputLabel: { color: '#9A9289', fontSize: 9, fontWeight: '800', letterSpacing: 1, marginBottom: 9 }, subjectPicker: { flexDirection: 'row', gap: 7, flexWrap: 'wrap' }, subjectChip: { borderWidth: 1, borderColor: '#E5DED5', borderRadius: 9, paddingHorizontal: 10, paddingVertical: 8 }, subjectChipActive: { backgroundColor: '#E6F4F1', borderColor: '#A9D2C6' }, subjectChipText: { color: '#756F68', fontSize: 11 }, subjectChipTextActive: { color: '#197A68', fontWeight: '800' }, durationRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 18 }, durationText: { color: '#302C28', fontWeight: '800' }, saveButton: { backgroundColor: '#197A68', borderRadius: 9, paddingHorizontal: 13, paddingVertical: 10 }, saveButtonText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' }, pageIntro: { marginBottom: 24 }, pageTitle: { color: '#302C28', fontSize: 29, fontWeight: '800', marginBottom: 7 }, pageCopy: { color: '#847C73', fontSize: 13, lineHeight: 19 }, scheduleCard: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 18, marginBottom: 14 }, scheduleCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }, cardTitle: { color: '#39342F', fontSize: 15, fontWeight: '800' }, cardHint: { color: '#9B938A', fontSize: 11 }, scheduleDays: { flexDirection: 'row', justifyContent: 'space-between' }, scheduleDay: { width: 35, height: 35, borderRadius: 18, backgroundColor: '#F3F0EA', alignItems: 'center', justifyContent: 'center' }, scheduleDaySelected: { backgroundColor: '#197A68' }, scheduleDayText: { color: '#9B938A', fontSize: 12, fontWeight: '800' }, scheduleDayTextSelected: { color: '#FFFFFF' }, breakBanner: { backgroundColor: '#FFF0E4', borderRadius: 16, padding: 14, flexDirection: 'row', alignItems: 'center', marginBottom: 25 }, breakIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#FFE0C8', alignItems: 'center', justifyContent: 'center', marginRight: 11 }, breakContent: { flex: 1 }, breakTitle: { color: '#68442D', fontSize: 13, fontWeight: '800' }, breakCopy: { color: '#A47759', fontSize: 11, marginTop: 4 }, scheduleSession: { backgroundColor: '#FFFFFF', borderRadius: 15, padding: 13, flexDirection: 'row', alignItems: 'center', marginTop: 10 }, sessionMarker: { width: 39, height: 39, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 11 }, sessionDuration: { color: '#6D665F', fontSize: 12, fontWeight: '800' }, progressGrid: { flexDirection: 'row', gap: 11, marginBottom: 14 }, metricCard: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 17, padding: 16 }, metricValue: { color: '#302C28', fontSize: 25, fontWeight: '800', marginTop: 12 }, metricLabel: { color: '#9A9289', fontSize: 9, fontWeight: '800', letterSpacing: 1, marginTop: 4 }, chartCard: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 18, marginBottom: 14 }, progressRow: { marginTop: 15 }, progressRowTop: { flexDirection: 'row', justifyContent: 'space-between' }, progressTrack: { height: 7, backgroundColor: '#F0ECE6', borderRadius: 4, marginTop: 8, overflow: 'hidden' }, progressFill: { height: 7, borderRadius: 4 }, milestone: { backgroundColor: '#E6F4F1', borderRadius: 16, padding: 15, flexDirection: 'row', alignItems: 'center' }, tabBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 82, borderTopWidth: 1, borderTopColor: '#E9E4DC', backgroundColor: '#FCFBF8', flexDirection: 'row', justifyContent: 'space-around', paddingTop: 14 }, tabButton: { alignItems: 'center', gap: 5, width: 85 }, tabLabel: { color: '#A7A19A', fontSize: 10, fontWeight: '700' }, tabLabelActive: { color: '#197A68' },
});
