import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../config/theme.dart';

class FluidNavBar extends StatelessWidget {
  final int currentIndex;
  final Function(int) onTap;

  const FluidNavBar({
    super.key,
    required this.currentIndex,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(left: 24, right: 24, bottom: 32),
      height: 72,
      decoration: BoxDecoration(
        color: AppTheme.surface.withValues(alpha: 0.8),
        borderRadius: BorderRadius.circular(36),
        border: Border.all(color: Colors.white.withValues(alpha: 0.08)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.5),
            blurRadius: 30,
            offset: const Offset(0, 10),
          )
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(36),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
          child: LayoutBuilder(
            builder: (context, constraints) {
              const itemCount = 4;
              final itemWidth = constraints.maxWidth / itemCount;
              final pillLeft =
                  currentIndex * itemWidth + (itemWidth - 36) / 2;

              return Stack(
                clipBehavior: Clip.none,
                children: [
                  // Sliding glowing pill — top edge
                  AnimatedPositioned(
                    duration: const Duration(milliseconds: 320),
                    curve: Curves.easeOutCubic,
                    left: pillLeft,
                    top: 0,
                    child: Container(
                      width: 36,
                      height: 3,
                      decoration: BoxDecoration(
                        color: AppTheme.primaryColor,
                        borderRadius: const BorderRadius.vertical(
                            bottom: Radius.circular(3)),
                        boxShadow: [
                          BoxShadow(
                            color:
                                AppTheme.primaryColor.withValues(alpha: 0.85),
                            blurRadius: 10,
                            spreadRadius: 1,
                          ),
                        ],
                      ),
                    ),
                  ),

                  // Nav items
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      _NavBarItem(
                        icon: Icons.home_rounded,
                        label: 'Home',
                        isSelected: currentIndex == 0,
                        onTap: () => _handleTap(0),
                      ),
                      _NavBarItem(
                        icon: Icons.map_rounded,
                        label: 'Map',
                        isSelected: currentIndex == 1,
                        onTap: () => _handleTap(1),
                      ),
                      _NavBarItem(
                        icon: Icons.notifications_rounded,
                        label: 'Alerts',
                        isSelected: currentIndex == 2,
                        onTap: () => _handleTap(2),
                      ),
                      _NavBarItem(
                        icon: Icons.person_rounded,
                        label: 'Profile',
                        isSelected: currentIndex == 3,
                        onTap: () => _handleTap(3),
                      ),
                    ],
                  ),
                ],
              );
            },
          ),
        ),
      ),
    ).animate().slideY(begin: 1.0, duration: 800.ms, curve: Curves.easeOutExpo);
  }

  void _handleTap(int index) {
    if (currentIndex != index) {
      HapticFeedback.lightImpact();
      onTap(index);
    }
  }
}

class _NavBarItem extends StatelessWidget {
  final IconData icon;
  final String label;
  final bool isSelected;
  final VoidCallback onTap;

  const _NavBarItem({
    required this.icon,
    required this.label,
    required this.isSelected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: SizedBox(
        width: 64,
        child: AnimatedOpacity(
          duration: const Duration(milliseconds: 220),
          opacity: isSelected ? 1.0 : 0.45,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              AnimatedContainer(
                duration: const Duration(milliseconds: 260),
                curve: Curves.easeOutBack,
                padding: EdgeInsets.all(isSelected ? 9 : 8),
                child: Icon(
                  icon,
                  color: isSelected
                      ? AppTheme.primaryColor
                      : AppTheme.textSecondary,
                  size: isSelected ? 26 : 24,
                ),
              ),
              AnimatedDefaultTextStyle(
                duration: const Duration(milliseconds: 220),
                style: TextStyle(
                  fontSize: 9,
                  fontWeight: isSelected ? FontWeight.w700 : FontWeight.w400,
                  color: isSelected
                      ? AppTheme.primaryColor
                      : AppTheme.textSecondary,
                ),
                child: Text(label),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
