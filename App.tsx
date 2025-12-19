import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './src/design/colors';
import { spacing } from './src/design/spacing';
import { typography } from './src/design/typography';
import { GlassCard } from './src/ui/GlassCard';
import { Button } from './src/ui/Button';
import { TextInput } from './src/ui/Input';
import { Badge } from './src/ui/Badge';
import { Chip } from './src/ui/Chip';
import { Spinner } from './src/ui/Loading';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.title}>ShoppingMall UI Test</Text>

        {/* Glass Card Test */}
        <GlassCard style={styles.section}>
          <Text style={styles.sectionTitle}>Glass Card</Text>
          <Text style={styles.text}>This is a glass morphism card component</Text>
        </GlassCard>

        {/* Buttons Test */}
        <GlassCard style={styles.section}>
          <Text style={styles.sectionTitle}>Buttons</Text>
          <View style={styles.buttonGroup}>
            <Button variant="primary" gradient>Primary Gradient</Button>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="primary" loading>Loading</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </View>
        </GlassCard>

        {/* Input Test */}
        <GlassCard style={styles.section}>
          <Text style={styles.sectionTitle}>Input Fields</Text>
          <TextInput
            label="Email"
            placeholder="Enter your email"
            leftIcon={<Ionicons name="mail-outline" size={20} color={colors.text.tertiary} />}
          />
          <View style={{ height: spacing.md }} />
          <TextInput
            label="Password"
            placeholder="Enter password"
            secureTextEntry
            leftIcon={<Ionicons name="lock-closed-outline" size={20} color={colors.text.tertiary} />}
          />
        </GlassCard>

        {/* Badges Test */}
        <GlassCard style={styles.section}>
          <Text style={styles.sectionTitle}>Badges</Text>
          <View style={styles.row}>
            <Badge variant="primary">5</Badge>
            <Badge variant="success">New</Badge>
            <Badge variant="error">-50%</Badge>
            <Badge variant="warning">Hot</Badge>
            <Badge variant="neutral">24</Badge>
          </View>
        </GlassCard>

        {/* Chips Test */}
        <GlassCard style={styles.section}>
          <Text style={styles.sectionTitle}>Chips</Text>
          <View style={styles.row}>
            <Chip label="Electronics" />
            <Chip label="Fashion" selected />
            <Chip label="Beauty" />
            <Chip label="Sports" />
          </View>
        </GlassCard>

        {/* Loading Test */}
        <GlassCard style={styles.section}>
          <Text style={styles.sectionTitle}>Loading</Text>
          <Spinner size="large" />
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  title: {
    fontSize: typography.heading.h2.fontSize,
    fontWeight: typography.heading.h2.fontWeight,
    color: colors.text.primary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  section: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.heading.h4.fontSize,
    fontWeight: typography.heading.h4.fontWeight,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  text: {
    fontSize: typography.body.medium.fontSize,
    color: colors.text.secondary,
  },
  buttonGroup: {
    gap: spacing.md,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
});
