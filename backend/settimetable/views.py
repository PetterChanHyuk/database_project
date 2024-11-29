#backend/settimetable/views.py
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from resist.models import Course
from datetime import datetime, timedelta

@csrf_exempt
def get_timetable(request):
    if request.method == 'POST':
        try:
            # form-data와 json 모두 처리
            if request.content_type == 'application/json':
                data = json.loads(request.body)
            else:
                data = request.POST

            room_number = data.get('room_number', '')
            day_of_week = data.get('day_of_week', '')

            # 8:00 ~ 22:00 시간 슬롯 생성 (30분 단위)
            time_slots = [0] * 28  # (22-8)*2 = 28개 슬롯
            
            # 시간 슬롯 배열의 인덱스 찾기 함수
            def get_slot_index(time_str):
                time_obj = datetime.strptime(time_str, '%H:%M')
                base_time = datetime.strptime('08:00', '%H:%M')
                diff = time_obj - base_time
                return int(diff.total_seconds() / 1800)  # 30분 = 1800초

            # 강의실, 요일로 수업 조회
            courses = Course.objects.filter(
                classroom__room_number__icontains=room_number,
                day_of_week=day_of_week
            ).select_related('classroom')

            # 각 수업을 해당하는 시간 슬롯에 표시
            for course in courses:
                start_time = course.start_time.strftime('%H:%M')
                end_time = course.end_time.strftime('%H:%M')
                
                start_idx = get_slot_index(start_time)
                end_idx = get_slot_index(end_time)
                
                # 해당 시간 슬롯을 1로 표시
                for i in range(start_idx, end_idx):
                    time_slots[i] = 1

            print("\n=== 시간표 배열 ===")
            print(time_slots)

            return JsonResponse({
                'status': 'success',
                'room_number': room_number,
                'day_of_week': day_of_week,
                'time_slots': time_slots  # [0, 0, 1, 1, 1, 0, ...] 형태의 배열
            })

        except Exception as e:
            print(f"에러 발생: {str(e)}")
            return JsonResponse({
                'status': 'error',
                'message': str(e)
            }, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)